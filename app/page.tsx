// app/page.tsx
import { ClientMap } from "@/components/client-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/header";
import { ArrowRight } from "lucide-react";

// Mock data for priority issues with coordinates
const priorityIssues = [
  {
    id: 1,
    title: "Deep Pothole Near School",
    location: "Location",
    coordinates: [22.3149, 87.3105],
    priority: "high",
    score: 82,
  },
  {
    id: 2,
    title: "Offensive Graffiti Near",
    location: "Location",
    coordinates: [22.3196, 87.3093],
    priority: "high",
    score: 79,
  },
  {
    id: 3,
    title: "Major Trash Overflow Near",
    location: "Location",
    coordinates: [22.3184, 87.3023],
    priority: "high",
    score: 77,
  },
  {
    id: 4,
    title: "Trash Overflow Near Park",
    location: "Location",
    coordinates: [22.3155, 87.3055],
    priority: "medium",
    score: 65,
  },
  {
    id: 5,
    title: "Trash Overflow Near Park",
    location: "Location",
    coordinates: [22.3158, 87.3065],
    priority: "medium",
    score: 65,
  },
  {
    id: 6,
    title: "Broken Streetlight",
    location: "Location",
    coordinates: [22.314, 87.31],
    priority: "medium",
    score: 60,
  },
  {
    id: 7,
    title: "Minor Pothole",
    location: "Location",
    coordinates: [22.316, 87.308],
    priority: "low",
    score: 40,
  },
  {
    id: 8,
    title: "Faded Road Markings",
    location: "Location",
    coordinates: [22.317, 87.305],
    priority: "low",
    score: 35,
  },
  {
    id: 9,
    title: "Overgrown Bushes",
    location: "Location",
    coordinates: [22.32, 87.311],
    priority: "low",
    score: 30,
  },
  {
    id: 10,
    title: "Litter on Street",
    location: "Location",
    coordinates: [22.319, 87.304],
    priority: "low",
    score: 25,
  },
];

export default function Dashboard() {
  const highPriorityCount = priorityIssues.filter(
    (issue) => issue.priority === "high"
  ).length;
  const mediumPriorityCount = priorityIssues.filter(
    (issue) => issue.priority === "medium"
  ).length;
  const lowPriorityCount = priorityIssues.filter(
    (issue) => issue.priority === "low"
  ).length;
  const totalReports = priorityIssues.length;

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") {
      return "bg-red-100 text-red-800 border-red-200";
    } else if (priority === "medium") {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getPriorityText = (priority: string) => {
    if (priority === "high") return "High Priority";
    if (priority === "medium") return "Medium Priority";
    return "Low Priority";
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex bg-white ">
        {/* Map Section */}
        <div className="pl-6 pb-6 rounded-md flex-1 h-full relative">
          <ClientMap issues={priorityIssues} />
          
          {/* Floating Total Active Reports */}
          <div className="absolute bottom-7 right-1 z-[1000]">
            <div className="bg-white rounded-lg border shadow-lg p-3 w-64">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm">
                  Total Active Reports
                </h3>
                <div className="text-xl font-bold">{totalReports}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-1">
                    {highPriorityCount}
                  </div>
                  <div className="text-xs text-red-500 font-medium text-wrap">
                    High Priority
                  </div>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-1">
                    {mediumPriorityCount}
                  </div>
                  <div className="text-xs text-yellow-500 font-medium">
                    Medium Priority
                  </div>
                </div>
                <div className="text-center *:flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-1">
                    {lowPriorityCount}
                  </div>
                  <div className="text-xs text-green-500 font-medium">
                    Low Priority
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-white p-4 pt-0  flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <h2
              className="text-xl font-bold mb-1 playfair-display"
              style={{ fontSize: "xx-large" }}
            >
              Priority List
            </h2>
            <p className="text-xs font-light text-gray-400 mb-2 font-inter">
              Our AI recommends the following order of resolving issues
            </p>

            <div className="space-y-1">
              {priorityIssues.slice(0, 4).map((issue, index) => (
                <div
                  key={issue.id}
                  className="bg-white flex justify-between items-start rounded-lg border px-4 py-3 "
                >
                    <div className="min-w-[60%] flex flex-col gap-2 ">
                      <div className="flex flex-col  items-start gap-2 mb-1">
                        <h3
                          className="leading-tight"
                          style={{
                            fontFamily: "inter",
                            fontSize: 18,
                            fontWeight: 600,
                          }}
                        >
                          {index + 1}. {issue.title}
                        </h3>
                      <p className="text-xs text-gray-300 font-light">
                        Location : {issue.location}
                      </p>
                      </div>


                      <Link
                        href={`/report/${issue.id}`}
                        className="text-xs text-gray-400 hover:underline font-light flex items-center"
                      >
                        View full report
                        <ArrowRight className="ml-1" size={15}  />
                      </Link>
                    </div>
                    <div className="flex flex-col items-end justify-center space-y-2 min-w-[30%] mr-0 ">
                      <Badge
                        className={` px-1.5 py-1 rounded border ${getPriorityBadge(
                          issue.priority
                        )}`}
                        style={{fontSize: 12}}
                      >
                        {getPriorityText(issue.priority)}
                      </Badge>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg ml-3 ${
                          issue.priority === "high"
                            ? "bg-red-500"
                            : issue.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {issue.score}
                      </div>
                    </div>
                
                </div>
              ))}
            </div>

            <Link href="/priority-list" className="mt-6 block">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                View All Reports
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
