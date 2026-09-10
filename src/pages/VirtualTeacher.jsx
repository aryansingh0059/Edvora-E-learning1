import { BookOpen, ChevronDown, HelpCircle, Lightbulb, MessageCircle, Play, Send, Sparkles, Users } from "lucide-react";
import React, { useState } from "react";

import axios from "axios";

export default function VirtualTeacher() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState("");
  const [captions, setCaptions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newComment, setNewComment] = useState("");
  const [expandedSection, setExpandedSection] = useState("video");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setVideoUrl("");
    setProgress("Generating script...");
    setCaptions("");
    setQuestions([]);
    setComments([]);

    try {
      // STEP 1: Generate Script
      const scriptRes = await axios.post(
        "http://localhost:4000/api/v1/tutor/script",
        { topic }
      );

      const script = scriptRes.data.script;
      setCaptions(script); // Display script as captions
      setProgress("Creating video job...");

      // STEP 2: Create video job (D-ID)
      const videoRes = await axios.post(
        "http://localhost:4000/api/v1/tutor/video",
        { script }
      );

      const jobId = videoRes.data.jobId;
      setProgress("Video job created. Generating video...");

      // STEP 3: Poll with timeout (5 minutes max)
      let pollCount = 0;
      const maxPolls = 100;
      const pollInterval = setInterval(async () => {
        pollCount++;
        try {
          const statusRes = await axios.get(
            `http://localhost:4000/api/v1/tutor/video-status/${jobId}`
          );

          const { status, videoUrl } = statusRes.data;

          console.log(
            `Poll #${pollCount}: status=${status}, videoUrl=${
              videoUrl ? "YES" : "NO"
            }`
          );

          if (videoUrl) {
            clearInterval(pollInterval);
            setVideoUrl(videoUrl);
            setProgress("Video ready! 🎉");
            setLoading(false);
            // Add sample questions
            setQuestions([
              { id: 1, text: "Can you explain this concept differently?", likes: 0 },
              { id: 2, text: "What are real-world applications?", likes: 0 },
            ]);
          } else if (pollCount >= maxPolls) {
            clearInterval(pollInterval);
            setLoading(false);
            setProgress("Video generation timeout. Please try again.");
          } else {
            setProgress(
              `Processing video${
                status ? `: ${status}` : "..."
              } (${pollCount}/${maxPolls})`
            );
          }
        } catch (pollErr) {
          clearInterval(pollInterval);
          setLoading(false);
          setProgress("Error checking video status.");
          console.error(pollErr);
        }
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Insufficent credit ");
      setLoading(false);
    }
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        { id: Date.now(), text: newQuestion, likes: 0 },
      ]);
      setNewQuestion("");
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: newComment, author: "You", timestamp: "just now" },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Enhanced Header with Glass Morphism */}
      <div className="bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg">
              <Sparkles size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Virtual AI Teacher
              </h1>
              <p className="text-blue-200/80 mt-1 font-light">Learn any topic with personalized AI-generated videos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Input Section */}
        <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          <label className="block font-semibold text-white mb-4 text-lg flex items-center gap-3">
            <Lightbulb size={24} className="text-yellow-400" />
            What would you like to learn today?
          </label>

          <div className="flex gap-4">
            <input
              className="flex-1 bg-gray-700/80 border-2 border-gray-600 rounded-2xl p-4 text-lg text-black placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              placeholder="e.g., Newton's First Law, Photosynthesis, World War II... "
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
            />

            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-lg"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  <span>Generate Video</span>
                </>
              )}
            </button>
          </div>

          {progress && (
            <div className="mt-6 p-4 bg-gray-700/80 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-sm text-blue-300 font-medium mb-2">{progress}</p>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((parseInt(progress.match(/\d+/)?.[0]) || 0) / 100 * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Main Content */}
        {videoUrl || loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video & Captions Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Enhanced Video Player */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                <div className="bg-black aspect-video flex items-center justify-center relative rounded-t-3xl">
                  {loading ? (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6" />
                      <p className="text-white font-semibold text-lg">Generating your video...</p>
                      <p className="text-gray-400 mt-2">This may take a few moments</p>
                    </div>
                  ) : videoUrl ? (
                    <video src={videoUrl} controls className="w-full h-full rounded-t-3xl" />
                  ) : null}
                </div>
                
                {/* Video Controls Footer */}
                <div className="p-4 bg-gray-900/80 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>AI Generated Lesson</span>
                    <span>HD Quality</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Captions Section */}
              {captions && (
                <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/10">
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <BookOpen size={20} className="text-blue-400" />
                    </div>
                    Transcript & Notes
                  </h3>
                  <div className="bg-gray-700/80 rounded-2xl p-6 max-h-64 overflow-y-auto text-gray-200 leading-relaxed border-l-4 border-blue-500 backdrop-blur-sm">
                    <p className="whitespace-pre-wrap">{captions}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Enhanced Questions Section */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <HelpCircle size={20} className="text-amber-400" />
                  </div>
                  Community Questions
                </h3>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-700/80 rounded-xl border border-amber-500/20 hover:border-amber-500/40 hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm">
                      <p className="text-sm text-white">{q.text}</p>
                      <button className="text-xs text-amber-400 mt-3 hover:text-amber-300 transition-colors flex items-center gap-1">
                        <span>👍</span>
                        <span>{q.likes > 0 ? `${q.likes} Likes` : "Like"}</span>
                      </button>
                    </div>
                  ))}
                  {questions.length === 0 && (
                    <div className="text-center py-8">
                      <HelpCircle size={32} className="mx-auto text-gray-500 mb-3" />
                      <p className="text-gray-400 text-sm">No questions yet</p>
                      <p className="text-gray-500 text-xs mt-1">Be the first to ask something!</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    className="flex-1 bg-gray-700/80 border border-gray-600 rounded-xl p-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="Ask a question..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addQuestion()}
                  />
                  <button
                    onClick={addQuestion}
                    className="bg-amber-500 text-white p-3 rounded-xl hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>

              {/* Enhanced Comments Section */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Users size={20} className="text-green-400" />
                  </div>
                  Discussion
                </h3>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {comments.map((c) => (
                    <div key={c.id} className="p-4 bg-gray-700/80 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-green-400">{c.author}</p>
                        <p className="text-xs text-gray-400">{c.timestamp}</p>
                      </div>
                      <p className="text-sm text-white">{c.text}</p>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <div className="text-center py-8">
                      <Users size={32} className="mx-auto text-gray-500 mb-3" />
                      <p className="text-gray-400 text-sm">No comments yet</p>
                      <p className="text-gray-500 text-xs mt-1">Start the conversation!</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    className="flex-1 bg-gray-700/80 border border-gray-600 rounded-xl p-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addComment()}
                  />
                  <button
                    onClick={addComment}
                    className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Enhanced Empty State
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-16 text-center border border-white/10">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Sparkles size={48} className="text-purple-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to learn something amazing?</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Enter any topic above to generate a personalized video lesson with AI-powered explanations, 
              interactive captions, and community discussions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-4 bg-gray-700/50 rounded-xl border border-white/5">
                <Sparkles size={24} className="text-purple-400 mx-auto mb-2" />
                <p className="text-white text-sm">AI-generated video lessons</p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-xl border border-white/5">
                <BookOpen size={24} className="text-blue-400 mx-auto mb-2" />
                <p className="text-white text-sm">Interactive transcripts</p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-xl border border-white/5">
                <Users size={24} className="text-green-400 mx-auto mb-2" />
                <p className="text-white text-sm">Community Q&A</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Powered by AI • Built for learners • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}