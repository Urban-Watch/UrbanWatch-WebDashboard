// app/page.tsx
import { ClientMap } from "@/components/client-map";
import { PriorityList } from "@/components/priority-list";
import { StatsCard } from "@/components/stats-card";
import { Header } from "@/components/header";

// Mock data for priority issues with coordinates
const priorityIssues = [
  {
    id: 1,
    title: "Deep Pothole Near School",
    location: "Location",
    coordinates: [22.3149, 87.3105],
    priority: "high",
    score: 82,
    reportDate: "2024-01-15",
    criticality: "High-traffic pothole in a school zone, posing an immediate safety risk",
  },
  {
    id: 2,
    title: "Offensive Graffiti Near School",
    location: "Location", 
    coordinates: [22.3196, 87.3093],
    priority: "high",
    score: 79,
    reportDate: "2024-01-14",
    criticality: "Offensive content visible to children in school area",
  },
  {
    id: 3,
    title: "Major Trash Overflow Near Park",
    location: "Location",
    coordinates: [22.3184, 87.3023],
    priority: "high", 
    score: 77,
    reportDate: "2024-01-13",
    criticality: "Large waste accumulation affecting public health",
  },
  {
    id: 4,
    title: "Trash Overflow Near Park",
    location: "Location",
    coordinates: [22.3155, 87.3055],
    priority: "medium",
    score: 65,
    reportDate: "2024-01-12",
    criticality: "Moderate waste accumulation needs attention",
  },
  {
    id: 5,
    title: "Trash Overflow Near Park",
    location: "Location", 
    coordinates: [22.3158, 87.3065],
    priority: "medium",
    score: 65,
    reportDate: "2024-01-11",
    criticality: "Moderate waste accumulation needs attention",
  },
  {
    id: 6,
    title: "Broken Streetlight",
    location: "Location",
    coordinates: [22.314, 87.31],
    priority: "medium",
    score: 60,
    reportDate: "2024-01-10",
    criticality: "Safety concern during nighttime hours",
  },
  {
    id: 7,
    title: "Minor Pothole",
    location: "Location",
    coordinates: [22.316, 87.308],
    priority: "low",
    score: 40,
    reportDate: "2024-01-09",
    criticality: "Small road defect, low traffic area",
  },
  {
    id: 8,
    title: "Faded Road Markings", 
    location: "Location",
    coordinates: [22.317, 87.305],
    priority: "low",
    score: 35,
    reportDate: "2024-01-08",
    criticality: "Visibility issue, non-critical road section",
  },
  {
    id: 9,
    title: "Overgrown Bushes",
    location: "Location",
    coordinates: [22.32, 87.311],
    priority: "low",
    score: 30,
    reportDate: "2024-01-07", 
    criticality: "Aesthetic concern, minimal impact",
  },
  {
    id: 10,
    title: "Litter on Street",
    location: "Location",
    coordinates: [22.319, 87.304],
    priority: "low",
    score: 25,
    reportDate: "2024-01-06",
    criticality: "Minor cleanliness issue",
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

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      
      <main className="flex-1 flex bg-white overflow-hidden">
        {/* Map Section - Full Width */}
        <div className="flex-1 relative">
          <ClientMap issues={priorityIssues} />
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white flex flex-col overflow-hidden border-l border-gray-200">
          {/* Priority List */}
          <div className="flex-1 overflow-y-auto">
            <PriorityList issues={priorityIssues} />
          </div>
          
          {/* Stats Card - Fixed at bottom */}
          <div className="border-t border-gray-200">
            <StatsCard 
              totalReports={totalReports}
              highPriorityCount={highPriorityCount}
              mediumPriorityCount={mediumPriorityCount}
              lowPriorityCount={lowPriorityCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
}