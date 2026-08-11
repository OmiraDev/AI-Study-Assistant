export default function Dashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome back! 👋</h1>
      
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h3 className="text-gray-500 font-medium">Total Summaries</h3>
          </div>
          <p className="text-4xl font-extrabold text-gray-900">12</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1-.96-4.8 2.5 2.5 0 0 1 1.08-2.92 2.5 2.5 0 0 1 2.92-1.08 2.5 2.5 0 0 1 2.42-6.06z"/></svg>
            </div>
            <h3 className="text-gray-500 font-medium">Quizzes Generated</h3>
          </div>
          <p className="text-4xl font-extrabold text-gray-900">5</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3 className="text-gray-500 font-medium">Saved Documents</h3>
          </div>
          <p className="text-4xl font-extrabold text-gray-900">8</p>
        </div>

      </div>
    </div>
  );
}