// app/report/[id]/page.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

// Mock data for individual reports
const reportData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Trash Overflow Near School",
    reportId: "#RP12345ABC256",
    submissionDate: "19 August 2025",
    submissionTime: "9:11 AM",
    description: "A large amount of trash has accumulated near the school, posing a health risk to students and residents.",
    criticalityScore: 82,
    priority: "high",
    status: "Unresolved",
    location: "D130 RK hall of residence, IIT KGP, Kharagpur 721302",
    aiAnalysis: "The AI analysis indicates a high urgency due to the proximity to a school and the potential for pest infestation.",
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
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Full Report</h1>
            <p className="text-gray-500">Report details and AI summaries</p>
          </div>
          <Badge variant={report.status === "Unresolved" ? "destructive" : "default"}>
            {report.status}
          </Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">{report.title}</h2>
                <div className="text-lg font-bold text-red-500">{report.criticalityScore}</div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <p>Report ID: {report.reportId}</p>
                <p>Submitted: {report.submissionDate} at {report.submissionTime}</p>
                <p>Location: {report.location}</p>
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-sm">Description</h3>
                <p className="text-sm text-gray-600 mt-2">{report.description}</p>
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-sm">AI Analysis</h3>
                <p className="text-sm text-gray-600 mt-2">{report.aiAnalysis}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* You can add a static map or other info here if needed */}
          </div>
        </div>
      </div>
    </div>
  )
}