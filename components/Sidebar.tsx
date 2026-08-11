"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, BrainCircuit, FolderOpen, History, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Summarizer", path: "/summarizer", icon: FileText },
    { name: "Quiz Generator", path: "/quiz", icon: BrainCircuit },
    { name: "My Documents", path: "/documents", icon: FolderOpen },
    { name: "History", path: "/history", icon: History },
  ];

  return (
    <div className="h-full w-full bg-white flex flex-col justify-between py-6 shadow-sm border-r border-gray-200">
      <div>
        <div className="px-6 mb-8 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">StudyStack</h1>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4">
        <Link 
          href="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
            pathname === "/settings" 
              ? "bg-blue-50 text-blue-600" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Settings size={20} className={pathname === "/settings" ? "text-blue-600" : "text-gray-400"} />
          Settings
        </Link>
      </div>
    </div>
  );
}