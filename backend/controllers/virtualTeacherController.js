import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { generateScript } from "../utils/llmClient.js";

// ----------------- Generate Lesson Script -----------------
export const generateScriptController = async (req, res) => {
    try {
        const { topic } = req.body;
        console.log("Received topic:", topic);

        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const prompt = `You are a friendly teacher. Create a simple spoken script (50-60 words)for teaching students in 2 line about: ${topic}.
                        Include:
                        - Introduction
                        - Explanation points
                        - Real-life examples
                        - Summary. in 50 words or less.
                        Make it engaging and easy to understand.`;
        



        const script = await generateScript(prompt);
        return res.json({
            success: true,
            script,
            message: "Script generated successfully"
        })


    } catch (error) {
        console.error("Script error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};


// ----------------- Create Video Job (D-ID) -----------------

export const createVideoJobController = async (req, res) => {
  try {
    let { script, avatar } = req.body;

    if (!script) {
      return res.status(400).json({ error: "Script is required" });
    }

    if (typeof script !== "string") {
      if (script.input && typeof script.input === "string") {
        script = script.input;
      } else {
        script = JSON.stringify(script);
      }
    }

    script = script
      .replace(/<think>[\s\S]*?<\/think>/g, "")
      .replace(/\\n/g, " ")
      .replace(/["""]+/g, "")
      .trim();

    const avatarUrl =
      avatar ||
      "https://umaine.edu/edhd/wp-content/uploads/sites/54/2023/03/Teacher-burnout-news-feature.jpg";

    const payload = {
      script: { type: "text", input: script },
      source_url: avatarUrl,
    };

    console.log("Cleaned script:", script);
    console.log("Payload sent to D-ID:", JSON.stringify(payload, null, 2));

    const encodedKey = Buffer.from(process.env.DID_API_KEY + ":").toString("base64");

    const response = await axios.post("https://api.d-id.com/talks", payload, {
      headers: {
        Authorization: `Basic ${encodedKey}`,
        "Content-Type": "application/json",
      },
    });

    return res.json({
      success: true,
      jobId: response.data.id,
      data: response.data,
    });
  } catch (error) {
    console.error("Video job error:", error.response?.data || error.message );
    return res.status(500).json({ error: error.response?.data || error.message || "Insufficient Credit"});
  }
};

export const pollVideoStatusController = async (req, res) => {
  try {
    const { id } = req.params;

    const encodedKey = Buffer.from(process.env.DID_API_KEY + ":").toString("base64");

    const response = await axios.get(`https://api.d-id.com/talks/${id}`, {
      headers: {
        Authorization: `Basic ${encodedKey}`,
        "Content-Type": "application/json"
      }
    });

    console.log("📺 D-ID Full Response:", JSON.stringify(response.data, null, 2));

    const { status, result, files } = response.data;
    
    // Try multiple ways to extract video URL from D-ID response
    let didVideoUrl = 
      result?.result_url || 
      result?.video_url ||
      response.data?.result_url ||
      response.data?.video_url ||
      files?.[0]?.url || 
      null;

    console.log(`📊 Status: ${status}, Video URL found: ${didVideoUrl ? "✅ YES" : "❌ NO"}`);

    // If no video URL yet, return status only
    if (!didVideoUrl) {
      return res.json({
        success: true,
        status,
        videoUrl: null,
        createdAt: result?.created_at || null,
        duration: result?.duration || null
      });
    }

    // Upload to Cloudinary
    try {
      console.log("🌩️ Downloading from D-ID:", didVideoUrl);
      const videoResp = await axios.get(didVideoUrl, { responseType: "stream", timeout: 30000 });

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", timeout: 60000 },
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary error:", error);
              return reject(error);
            }
            console.log("✅ Uploaded to Cloudinary:", result.secure_url);
            resolve(result);
          }
        );
        videoResp.data.pipe(stream);
      });

      const cloudUrl = uploadResult?.secure_url || uploadResult?.url || didVideoUrl;

      return res.json({
        success: true,
        status,
        videoUrl: cloudUrl,
        createdAt: result?.created_at || null,
        duration: result?.duration || null
      });
    } catch (uploadErr) {
      console.error("⚠️ Cloudinary upload failed:", uploadErr.message);
      return res.json({
        success: true,
        status,
        videoUrl: didVideoUrl,
        createdAt: result?.created_at || null,
        duration: result?.duration || null,
        warning: "Cloudinary upload failed, using original D-ID URL"
      });
    }

  } catch (error) {
    console.error("❌ Poll error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};
