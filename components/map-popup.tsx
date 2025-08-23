// components/map-popup.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Issue {
  id: number;
  title: string;
  location: string;
  priority: string;
  score: number;
  reportDate?: string;
  criticality?: string;
}

interface MapPopupProps {
  issue: Issue;
  onClose: () => void;
}

export function MapPopup({ issue, onClose }: MapPopupProps) {
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
    <div className="bg-white rounded-lg shadow-lg border p-4 min-w-[280px] max-w-[320px]">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-base leading-tight pr-2">
          {issue.title}
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">{issue.location}</p>
        {issue.reportDate && (
          <p className="text-xs text-gray-500">
            Report submitted on {issue.reportDate}
          </p>
        )}
      </div>

      {issue.criticality && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Criticality:</p>
          <p className="text-sm text-gray-600">{issue.criticality}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
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

      <Link href={`/report/${issue.id}`}>
        <Button 
          className="w-full bg-black text-white hover:bg-gray-800 text-sm"
          onClick={onClose}
        >
          View full report
        </Button>
      </Link>
    </div>
  );
}