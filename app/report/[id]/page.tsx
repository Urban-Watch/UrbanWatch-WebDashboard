// app/report/[id]/page.tsx
"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { ClientMap } from "@/components/client-map"
import { ImageSlideshow } from "@/components/image-slideshow"
import { useReport, useUpdateReportStatus } from "@/hooks/use-api"
import { useState, useEffect, useRef } from "react"
import { use } from "react"

interface ReportPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ReportPage({ params }: ReportPageProps) {
  const { id } = use(params);
  const { data: report, loading, error } = useReport(id);
  const { updateStatus, loading: updating, error: updateError } = useUpdateReportStatus();
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setStatusDropdownOpen(false);
      }
    };

    if (statusDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [statusDropdownOpen]);
  
  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">❌ Error Loading Report</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-6 w-32"></div>
            <div className="h-8 bg-gray-300 rounded mb-4 w-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="h-64 bg-gray-300 rounded"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show not found if no report
  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus: string) => {
    const success = await updateStatus(id, newStatus as any);
    if (success) {
      setStatusDropdownOpen(false);
      // Optionally refresh the page or update local state
      window.location.reload();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-500 hover:bg-green-600';
      case 'In Progress': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-red-500 hover:bg-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header with status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold playfair-display">Full Report</h1>
            <p className="text-gray-500 font-inter">Report details and AI summaries</p>
          </div>
          <div className="flex items-center gap-2 relative">
            <span className="text-sm text-gray-600 font-inter">Current Status :</span>
            {updateError && (
              <div className="absolute top-8 right-0 bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                {updateError}
              </div>
            )}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                disabled={updating}
                className={`${getStatusColor(report.status || 'Unresolved')} text-white px-3 py-1 rounded cursor-pointer hover:opacity-90 transition-opacity ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {updating ? 'Updating...' : report.status} ▼
              </button>
              
              {statusDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-32">
                  <button
                    onClick={() => handleStatusUpdate('waiting_for_attention')}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    Unresolved
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('got_the_attention')}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('resolved')}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            {/* Image slideshow */}
            <ImageSlideshow 
              images={report.images || []} 
              alt={report.title}
            />

            {/* Report details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold playfair-display">{report.title}</h2>
                <Badge 
                  className={`text-white text-xs px-2 py-1 ${
                    report.priority === 'high' ? 'bg-red-500' : 
                    report.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                >
                  {report.priority === 'high' ? 'High Priority' : 
                   report.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm font-inter">
                <div className="flex gap-4">
                  <span className="text-gray-600">Report ID :</span>
                  <span className="text-gray-900">{report.report_id || `#${report.id}`}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600">Submission Date :</span>
                  <span className="text-gray-900">{report.reportDate || 'N/A'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600">Category :</span>
                  <span className="text-gray-900 capitalize">{report.category || 'N/A'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600">People Reported :</span>
                  <span className="text-gray-900">{report.people_reported || 0}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm playfair-display">Description :</h3>
                <div className="border border-gray-300 rounded p-3 min-h-20 bg-white font-inter">
                  {report.criticality || 'No description available'}
                </div>
              </div>

              {/* New Severity Score Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm playfair-display">Severity Score:</span>
                  <Badge className="bg-blue-500 text-white text-lg font-bold px-3 py-1">
                    {report.severity_score || 'N/A'}
                  </Badge>
                </div>
                {report.severity_analysis && (
                  <div className="border border-gray-300 rounded p-3 bg-blue-50 font-inter text-sm">
                    <span className="font-semibold text-blue-800">Severity Analysis: </span>
                    {report.severity_analysis}
                  </div>
                )}
              </div>

              {/* New Impact Score Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm playfair-display">Impact Score:</span>
                  <Badge className="bg-purple-500 text-white text-lg font-bold px-3 py-1">
                    {report.impact_score || 'N/A'}
                  </Badge>
                </div>
                {report.impact_analysis && (
                  <div className="border border-gray-300 rounded p-3 bg-purple-50 font-inter text-sm">
                    <span className="font-semibold text-purple-800">Impact Analysis: </span>
                    {report.impact_analysis}
                  </div>
                )}
              </div>

              {/* Population and Vehicle Estimates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-sm playfair-display">Population Estimate:</span>
                  <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                    <span className="text-green-800 font-bold text-lg">{report.population_estimate || 'N/A'}</span>
                    <p className="text-green-600 text-xs">residents</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-sm playfair-display">Vehicle Estimate:</span>
                  <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
                    <span className="text-orange-800 font-bold text-lg">{report.vehicle_estimate || 'N/A'}</span>
                    <p className="text-orange-600 text-xs">vehicles</p>
                  </div>
                </div>
              </div>

              {/* Criticality Score Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm playfair-display">Criticality Score:</span>
                  <Badge className={`text-white text-lg font-bold px-3 py-1 ${
                    report.priority === 'high' ? 'bg-red-500' : 
                    report.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {report.score}
                  </Badge>
                </div>
                {report.ai_analysis && (
                  <div className={`border border-gray-300 rounded p-3 font-inter text-sm ${
                    report.priority === 'high' ? 'bg-red-50' : 
                    report.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50'
                  }`}>
                    <span className={`font-semibold ${
                      report.priority === 'high' ? 'text-red-800' : 
                      report.priority === 'medium' ? 'text-yellow-800' : 'text-green-800'
                    }`}>Criticality Analysis: </span>
                    {report.ai_analysis}
                  </div>
                )}
              </div>

              {/* Admin Notes Section */}
              {report.admin_notes && (
                <div className="space-y-2">
                  <h3 className="font-bold text-sm playfair-display text-blue-600">Admin Notes :</h3>
                  <div className="border border-blue-300 rounded p-3 min-h-20 bg-blue-50 font-inter">
                    {report.admin_notes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Interactive Map */}
          <div className="space-y-4">
            <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
              <ClientMap issues={[{
                id: report.id,
                title: report.title,
                location: report.location,
                coordinates: report.coordinates,
                priority: report.priority,
                score: report.score
              }]} />
            </div>

            {/* Location info */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700 playfair-display">Location :</h3>
              <p className="text-gray-900 text-sm leading-relaxed font-inter">
                {report.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}