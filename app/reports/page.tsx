"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { useAllReports } from "@/hooks/use-api"
import { useState } from "react"

export default function AllReportsPage() {
  const { data: reports, loading, error } = useAllReports();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter reports based on search term
  const filteredReports = reports?.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.report_id?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getPriorityBadgeStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500 playfair-display">❌ Error Loading Reports</h1>
          <p className="text-gray-600 mb-4 font-inter">{error}</p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 playfair-display">All Reports</h1>
          <p className="text-gray-500 font-inter">Our AI analyses each report and sorts them based on their criticality.</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search Report"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300"
          />
        </div>

        {/* Reports list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 bg-gray-300 rounded w-8"></div>
                      <div className="h-6 bg-gray-300 rounded w-48"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                      <div className="h-3 bg-gray-300 rounded w-32"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-10 bg-gray-300 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report, index) => (
              <div key={report.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-600 font-inter">{index + 1}.</span>
                      <h3 className="text-lg font-semibold text-gray-900 playfair-display">{report.title}</h3>
                      <Badge className={`text-xs px-2 py-1 ${getPriorityBadgeStyle(report.priority)}`}>
                        {report.priority === 'high' ? 'High Priority' : 
                         report.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 mb-4 font-inter">
                      {/* <p><span className="font-medium">#{report.report_id}</span></p> */}
                      <p>Location: {report.location}</p>
                      <p>Report submitted on: {report.reportDate}</p>
                      <p className="text-gray-700">
                        <span className="font-medium">Criticality:</span> {report.criticality}
                      </p>
                    </div>
                    
                    <Link href={`/report/${report.report_id || report.id}`}>
                      <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                        View full report →
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* <Badge className={`text-xs px-2 py-1 ${getPriorityBadgeStyle(report.priority)}`}>
                      {report.priority === 'high' ? 'High Priority' : 
                       report.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                    </Badge> */}
                    <div className={`
                      flex items-center justify-center w-20 h-20 rounded text-white font-bold text-3xl
                      ${report.priority === 'high' ? 'bg-red-500' : 
                        report.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                    `}>
                      {report.score}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredReports.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 font-inter">No reports found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
