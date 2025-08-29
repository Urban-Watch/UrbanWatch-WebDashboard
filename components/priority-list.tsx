// components/priority-list.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Issue {
  id: number;
  title: string;
  location: string;
  coordinates: [number, number];
  priority: string;
  score: number;
  reportDate?: string;
  criticality?: string;
  report_id?: string;
}

interface PriorityListProps {
  issues: Issue[];
  loading?: boolean;
}

export function PriorityList({ issues, loading = false }: PriorityListProps) {
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

  const getScoreColor = (priority: string) => {
    if (priority === "high") return "bg-red-500";
    if (priority === "medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-1 playfair-display">
        Priority List
      </h2>
      <p className="text-sm text-gray-500 mb-4 font-inter">
        Our AI recommends the following order of resolving issues
      </p>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : issues.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No reports available
        </div>
      ) : (
        <div className="space-y-3">
          {issues.slice(0, 5).map((issue, index) => (
            <div
              key={issue.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-base leading-tight pr-2">
                      {index + 1}. {issue.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">
                    Location: {issue.location}
                  </p>

                  <Link
                    href={`/report/${issue.report_id || issue.id}`}
                    className="text-sm text-gray-400 hover:text-gray-600 hover:underline flex items-center"
                  >
                    View full report
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <Badge
                    className={`px-2 py-1 text-xs font-medium ${getPriorityBadge(
                      issue.priority
                    )}`}
                  >
                    {getPriorityText(issue.priority)}
                  </Badge>
                  
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${getScoreColor(
                      issue.priority
                    )}`}
                  >
                    {issue.score}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link href="/reports">
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            View All Reports
          </Button>
        </Link>
      </div>
    </div>
  );
}