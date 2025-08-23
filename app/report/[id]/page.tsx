// app/report/[id]/page.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { ClientMap } from "@/components/client-map"

// Mock data for individual reports
const reportData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Trash Overflow Near School",
    reportId: "#RP12345ABC256",
    submissionDate: "19 August 2025",
    submissionTime: "9:11 AM",
    description: "",
    criticalityScore: 82,
    priority: "high",
    status: "Unresolved",
    location: "D130 RK hall of residence, IIT KGP, Kharagpur 721302",
    coordinates: [22.3149, 87.3105], // IIT Kharagpur coordinates
    aiAnalysis: "",
  },
}

interface ReportPageProps {
  params: {
    id: string
  }
}

export default function ReportPage({ params }: ReportPageProps) {
  const report = reportData[params.id]
  
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
    )
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

        {/* Header with status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Full Report</h1>
            <p className="text-gray-500">Report details and AI summaries</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Current Status :</span>
            <Badge 
              variant="destructive" 
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1"
            >
              {report.status} ▼
            </Badge>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            {/* Image placeholder */}
            <div className="bg-gray-300 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-600 text-lg">Image</span>
            </div>

            {/* Report details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{report.title}</h2>
                <Badge 
                  variant="destructive" 
                  className="bg-red-500 text-white text-xs px-2 py-1"
                >
                  High Priority
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-4">
                  <span className="text-gray-600">Report ID :</span>
                  <span className="text-gray-900">{report.reportId}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600">Submission Date :</span>
                  <span className="text-gray-900">{report.submissionDate}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600">Submission Time :</span>
                  <span className="text-gray-900">{report.submissionTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm">Description :</h3>
                <div className="border border-gray-300 rounded p-3 min-h-20 bg-white">
                  {/* Empty description box */}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-sm">Criticality Score:</span>
                <Badge className="bg-red-500 text-white text-lg font-bold px-3 py-1">
                  {report.criticalityScore}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm">AI Analysis :</h3>
                <div className="border border-gray-300 rounded p-3 min-h-20 bg-white">
                  {/* Empty AI analysis box */}
                </div>
              </div>
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
                score: report.criticalityScore
              }]} />
            </div>

            {/* Location info */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Location :</h3>
              <p className="text-gray-900 text-sm leading-relaxed">
                {report.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}