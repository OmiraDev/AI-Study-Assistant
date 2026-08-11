import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyStack | Dashboard",
  description: "AI-Powered Study Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex h-screen overflow-hidden`}>
        
        {/* Left Sidebar - Fixed */}
        <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 hidden md:block z-20">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          
          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>

      </body>
    </html>
  );
}