"use client";
import { useState } from "react";
import UploadModal from "../../components/UploadModal";
import { FileText, Plus } from "lucide-react";

export default function DocumentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>
          <p className="text-gray-500 mt-1">Upload and manage your study materials.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2"
        >
          <Plus size={20} />
          Upload New PDF
        </button>
      </div>

      <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
         <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
           <FileText size={32} />
         </div>
         <h3 className="text-xl font-semibold text-gray-800 mb-2">No documents yet</h3>
         <p className="text-gray-500 mb-6">Upload your first PDF to get started with AI summaries and quizzes.</p>
         <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-xl font-medium transition"
         >
           Upload Document
         </button>
      </div>

      {/* අපේ Upload Modal එක මෙතනින් සම්බන්ධ කරලා තියෙනවා */}
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}