"use client";
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizGeneratorPage() {
  const [text, setText] = useState("");
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    if (!text.trim()) {
      setError("Please enter some text to generate a quiz.");
      return;
    }

    setLoading(true);
    setError("");
    setQuiz(null);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate quiz");
      }

      setQuiz(data.quiz);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">AI Quiz Generator</h2>
        <p className="text-gray-500 mt-2">Paste your notes here and let AI create a multiple-choice quiz for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[550px]">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Study Material</h3>
          <textarea
            className="w-full flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Paste your article or study notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          <button
            onClick={generateQuiz}
            disabled={loading || !text.trim()}
            className={`mt-4 w-full py-3 px-4 rounded-xl text-white font-medium transition-all ${
              loading || !text.trim()
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating Quiz...
              </span>
            ) : (
              "Generate Quiz"
            )}
          </button>
        </div>

        {/* Result Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-y-auto h-[550px]">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Generated Questions</h3>
          
          {!quiz && !loading && (
            <div className="h-full flex items-center justify-center text-gray-400 flex-col text-center">
              <p>Your generated multiple-choice questions<br/>will appear here.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center flex-col gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 animate-pulse">AI is crafting your questions...</p>
            </div>
          )}

          {quiz && (
            <div className="flex flex-col gap-6">
              {quiz.map((q, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <p className="font-semibold text-gray-800 mb-4">
                    {index + 1}. {q.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    {q.options.map((option, optIdx) => (
                      <div 
                        key={optIdx} 
                        className={`p-3 rounded-lg border text-sm ${
                          option === q.correctAnswer 
                            ? "bg-green-50 border-green-200 text-green-800 font-bold" 
                            : "bg-white border-gray-200 text-gray-600"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}