import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ReportMap } from "@/components/report-map"
import { Header } from "@/components/header"

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
    coordinates: [22.3149, 87.3105],
    aiAnalysis: "",
    imageUrl: "/trash-overflow-school.png",
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
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
            <Link href="/">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm hover:text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">Full Report</h1>
            <p className="text-gray-600">Report details and AI summaries</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current Status:</span>
            <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600">
              {report.status} ▼
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Image Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Image</span>
            </div>

            {/* Report Details */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">{report.title}</h2>
                <Badge className="bg-red-500 hover:bg-red-600 text-white">
                  High Priority
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Report ID:</span>
                  <span className="ml-2 text-gray-600">{report.reportId}</span>
                </div>
                <div>
                  <span className="font-medium">Submission Date:</span>
                  <span className="ml-2 text-gray-600">{report.submissionDate}</span>
                </div>
                <div>
                  <span className="font-medium">Submission Time:</span>
                  <span className="ml-2 text-gray-600">{report.submissionTime}</span>
                </div>
              </div>

              <div className="mt-6">
                <span className="font-medium text-sm">Description:</span>
                <div className="mt-2 p-3 border rounded bg-gray-50 min-h-[80px]">
                  {report.description || "No description provided"}
                </div>
              </div>

              <div className="mt-6">
                <span className="font-medium text-sm">Criticality Score:</span>
                <div className="mt-2">
                  <span className="bg-red-500 text-white px-3 py-1 rounded text-lg font-bold">
                    {report.criticalityScore}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <span className="font-medium text-sm">AI Analysis:</span>
                <div className="mt-2 p-3 border rounded bg-gray-50 min-h-[80px]">
                  {report.aiAnalysis || "No AI analysis available"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border overflow-hidden h-96">
              <ReportMap
                coordinates={report.coordinates}
                title={report.title}
                priority={report.priority}
                className="w-full h-full"
              />
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-medium mb-4">Location:</h3>
              <p className="text-gray-600">{report.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
