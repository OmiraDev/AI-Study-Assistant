"use client";
import { Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/summarizer") return "AI Summarizer";
    if (pathname === "/quiz") return "Quiz Generator";
    if (pathname === "/documents") return "My Documents";
    if (pathname === "/history") return "History";
    if (pathname === "/settings") return "Settings";
    return "Welcome";
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all w-64"
          />
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 transition">
          <Bell size={22} />
        </button>
        
        <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200 cursor-pointer">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}