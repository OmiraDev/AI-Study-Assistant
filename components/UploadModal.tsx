"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, UploadCloud, Loader2 } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // 
      localStorage.setItem("importedText", data.text);
      
      onClose(); // 
      router.push("/summarizer"); //
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Document</h2>
        <p className="text-gray-500 text-sm mb-6">Upload a PDF file to extract text for summaries or quizzes.</p>

        <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50/50 mb-6">
          <UploadCloud size={48} className="text-blue-500 mb-4" />
          <input 
            type="file" 
            accept=".pdf"
            className="hidden" 
            id="file-upload"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label 
            htmlFor="file-upload"
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-50 transition shadow-sm"
          >
            Select PDF File
          </label>
          {file && (
            <p className="mt-4 text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-center truncate max-w-full">
              {file.name}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full py-3 rounded-xl text-white font-medium transition-all ${
            !file || loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} /> Extracting Text...
            </span>
          ) : (
            "Process Document"
          )}
        </button>
      </div>
    </div>
  );
}