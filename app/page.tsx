import { InteractiveMap } from "@/components/interactive-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

// Mock data for priority issues
const priorityIssues = [
  {
    id: 1,
    title: "Deep Pothole Near School",
    location: "D130 RK hall of residence, IIT KGP",
    reportId: "#RP12345ABC256",
    submittedOn: "19 August 2025",
    priority: "high",
    score: 82,
    description: "High-severity deep pothole in a school zone, posing an immediate safety risk",
  },
  {
    id: 2,
    title: "Offensive Graffiti Near School",
    location: "Main Gate Area, IIT KGP",
    reportId: "#RP12345ABC257",
    submittedOn: "19 August 2025",
    priority: "high",
    score: 79,
    description: "Inappropriate graffiti requiring immediate attention",
  },
  {
    id: 3,
    title: "Major Trash Overflow Near Park",
    location: "Technology Park, IIT KGP",
    reportId: "#RP12345ABC258",
    submittedOn: "18 August 2025",
    priority: "high",
    score: 77,
    description: "Large accumulation of trash affecting public health",
  },
  {
    id: 4,
    title: "Trash Overflow Near Park",
    location: "Central Park Area, IIT KGP",
    reportId: "#RP12345ABC259",
    submittedOn: "18 August 2025",
    priority: "medium",
    score: 65,
    description: "Moderate trash accumulation requiring attention",
  },
  {
    id: 5,
    title: "Trash Overflow Near Park",
    location: "West Campus, IIT KGP",
    reportId: "#RP12345ABC260",
    submittedOn: "18 August 2025",
    priority: "medium",
    score: 63,
    description: "Moderate trash accumulation requiring attention",
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border overflow-hidden h-[600px]">
              <InteractiveMap className="w-full h-full border-0" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Priority List Header */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Priority List</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Our AI recommends the following order of resolving issues
              </p>
            </div>

            {/* Priority Issues */}
            <div className="space-y-4">
              {priorityIssues.slice(0, 5).map((issue, index) => (
                <div
                  key={issue.id}
                  className="bg-white rounded-lg border p-4 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      {index + 1}.
                    </span>
                    <Badge 
                      variant={issue.priority === "high" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {issue.priority === "high" ? "High Priority" : "Medium Priority"}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium text-sm mb-2 leading-tight">
                    {issue.title}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    Location
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/report/${issue.id}`}
                      className="text-xs text-primary hover:underline"
                    >
                      View full report →
                    </Link>
                    <div className="text-xl font-bold text-red-500">
                      {issue.score}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full List Button */}
            <Link href="/priority-list">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                View Full List
              </Button>
            </Link>

            {/* Total Active Reports */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium mb-4">Total Active Reports</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold">10</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="bg-red-500 text-white rounded-lg p-3 mb-1">
                    <div className="text-2xl font-bold">3</div>
                  </div>
                  <div className="text-xs text-muted-foreground">High Priority</div>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-500 text-white rounded-lg p-3 mb-1">
                    <div className="text-2xl font-bold">3</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Medium Priority</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-500 text-white rounded-lg p-3 mb-1">
                    <div className="text-2xl font-bold">4</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Low Priority</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
