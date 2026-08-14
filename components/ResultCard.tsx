import React from 'react';

interface ResultCardProps {
  originalText: string;
  summaryText: string;
  date: string;
}

export default function ResultCard({ originalText, summaryText, date }: ResultCardProps) {
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          AI Summary
        </span>
        <span className="text-xs text-gray-400 font-medium">{formattedDate}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            Original Text
          </h4>
          <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">{originalText}</p>
        </div>
        
        <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-50">
          <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
            Summary Result
          </h4>
          <p className="text-sm text-gray-800 leading-relaxed">{summaryText}</p>
        </div>
      </div>
    </div>
  );
}