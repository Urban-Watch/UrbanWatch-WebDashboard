// app/page.tsx
"use client";

import { ClientMap } from "@/components/client-map";
import { PriorityList } from "@/components/priority-list";
import { StatsCard } from "@/components/stats-card";
import { Header } from "@/components/header";
import { usePriorityReports, useReportsSummary } from "@/hooks/use-api";

export default function Dashboard() {
  const { data: priorityReports, loading: reportsLoading, error: reportsError } = usePriorityReports();
  const { data: summary, loading: summaryLoading, error: summaryError } = useReportsSummary();

  // Show error states
  if (reportsError || summaryError) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-red-500 text-xl mb-4">❌ API Connection Failed</div>
            <div className="text-gray-600 mb-2">
              {reportsError && <div>Reports: {reportsError}</div>}
              {summaryError && <div>Summary: {summaryError}</div>}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Use API data or show loading
  const issues = priorityReports || [];
  const stats = summary || { totalReports: 0, highPriorityCount: 0, mediumPriorityCount: 0, lowPriorityCount: 0 };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      
      <main className="flex-1 flex bg-white overflow-hidden">
        {/* Map Section - Full Width */}
        <div className="flex-1 relative">
          {reportsLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-500">Loading map data...</div>
            </div>
          ) : (
            <ClientMap issues={issues} />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white flex flex-col overflow-hidden border-l border-gray-200">
          {/* Priority List */}
          <div className="flex-1 overflow-y-auto">
            <PriorityList issues={issues} loading={reportsLoading} />
          </div>
          
          {/* Stats Card - Fixed at bottom */}
          <div className="border-t border-gray-200">
            <StatsCard 
              totalReports={stats.totalReports}
              highPriorityCount={stats.highPriorityCount}
              mediumPriorityCount={stats.mediumPriorityCount}
              lowPriorityCount={stats.lowPriorityCount}
              loading={summaryLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}