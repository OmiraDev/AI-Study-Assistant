"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // 1. useSession එක අනිවාර්යයෙන්ම මෙතන function එක ඇතුළේ තියෙන්න ඕනේ
  const { data: session } = useSession();
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
        
        {/* 2. පරණ User icon එක අයින් කරලා අලුත් Authentication කේතය මෙතනට දැම්මා */}
        {session ? (
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              {session.user?.name?.charAt(0).toUpperCase()}
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}