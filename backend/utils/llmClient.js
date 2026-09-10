import Groq from "groq-sdk";

let client = null;

function getClient() {
	// Return existing client if already created
	if (client) return client;

	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		throw new Error(
			"GROQ_API_KEY is missing or empty. Set GROQ_API_KEY in your environment or .env before starting the server."
		);
	}

	client = new Groq({ apiKey });
	return client;
}

export async function generateScript(prompt) {
	try {
		const groqClient = getClient();
		const response = await groqClient.chat.completions.create({
			model: "qwen/qwen3-32b",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.6
		});
		console.log("LLM response:", response);
		if (!response.choices || response.choices.length === 0) {
			throw new Error("No response from LLM");
		}
		return response.choices[0].message.content;
	} catch (err) {
		// surface clearer errors for runtime issues
		throw new Error(`LLM error: ${err.message || err.toString()}`);
	}
}
