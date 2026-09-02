"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FileText, HelpCircle, Clock, ArrowRight, Loader2 } from "lucide-react";

interface Activity {
  _id: string;
  originalText: string;
  createdAt: string;
}

interface DashboardStats {
  summaries: number;
  quizzes: number;
  recent: Activity[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-3">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Student"}! 👋
        </h1>
        <p className="text-blue-100 opacity-90">
          Here's a quick overview of your study progress today. Let's keep the momentum going!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Summaries</p>
            <h3 className="text-3xl font-bold text-gray-800">{stats?.summaries || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <HelpCircle size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Generated Quizzes</p>
            <h3 className="text-3xl font-bold text-gray-800">{stats?.quizzes || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Study Hours (Est.)</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {((stats?.summaries || 0) * 0.5 + (stats?.quizzes || 0) * 0.3).toFixed(1)}
            </h3>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
          <Link href="/history" className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="p-2">
          {stats?.recent && stats.recent.length > 0 ? (
            stats.recent.map((activity, index) => (
              <div key={activity._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition cursor-default border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 line-clamp-1 w-64 md:w-96">
                      {activity.originalText.substring(0, 60)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.createdAt).toLocaleDateString()} at {new Date(activity.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  Summary
                </span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No recent activity found. Let's create your first summary!</p>
              <Link href="/summarizer" className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm">
                Go to Summarizer
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}