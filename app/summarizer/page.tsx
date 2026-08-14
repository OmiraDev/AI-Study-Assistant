"use client";
import { useState } from "react";
import { Sparkles, FileText } from "lucide-react";

export default function Summarizer() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSummarize = async () => {
    if (!inputText) return;
    setIsLoading(true);
    setSummary(""); 
    
    try {
     
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();

      if (res.ok) {
        setSummary(data.summary); 
      } else {
        setSummary("Error: Could not generate summary. " + data.error);
      }
    } catch (error) {
      setSummary("An error occurred while connecting to the AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="text-blue-600" />
          AI Summarizer
        </h1>
        <p className="text-gray-500 mt-2">Paste your long texts, articles, or notes and let AI summarize them for you.</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FileText size={18} /> Original Text
          </h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your long text here..."
            className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          ></textarea>
          
          <button
            onClick={handleSummarize}
            disabled={isLoading || !inputText}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2 shadow-sm"
          >
            {isLoading ? "Summarizing with AI..." : "Generate Summary"}
          </button>
        </div>

        {/* Output Section  */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              Summary Result
           </h3>
           <div className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl overflow-y-auto">
             {summary ? (
               <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm text-center gap-2">
                 <Sparkles size={24} className="mb-2 opacity-50" />
                 <span>Your summary will appear here.<br/>Paste some text and click generate!</span>
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}