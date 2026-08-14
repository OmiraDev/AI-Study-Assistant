"use client";
import { useEffect, useState } from "react";
import ResultCard from "../../components/ResultCard";


interface SummaryData {
  _id: string;
  originalText: string;
  summaryText: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [summaries, setSummaries] = useState<SummaryData[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        if (data.summaries) {
          setSummaries(data.summaries);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your History</h2>
        <p className="text-gray-500 mt-2">View all your previously generated AI summaries.</p>
      </div>
      
      {loading ? (
        <div className="text-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading your history...</p>
        </div>
      ) : summaries.length === 0 ? (
        <div className="text-center mt-10 p-12 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No summaries found. Generate your first summary!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {summaries.map((item) => (
            <ResultCard
              key={item._id}
              originalText={item.originalText}
              summaryText={item.summaryText}
              date={item.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}