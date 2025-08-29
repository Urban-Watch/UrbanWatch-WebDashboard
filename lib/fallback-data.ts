// lib/fallback-data.ts
import { FrontendIssue, FrontendSummary } from './data-transformers';

// Fallback data for development/demo purposes
export const fallbackIssues: FrontendIssue[] = [
  {
    id: 1,
    title: "Deep Pothole Near School",
    location: "D130 RK hall of residence, IIT KGP, Kharagpur 721302",
    coordinates: [22.3149, 87.3105],
    priority: "high",
    score: 82,
    reportDate: "2024-01-15",
    criticality: "High-traffic pothole in a school zone, posing an immediate safety risk",
    status: "Unresolved",
    category: "potholes",
    ai_analysis: "This pothole poses a significant safety risk due to its location near a school zone and its considerable depth.",
    images: [],
    people_reported: 15,
    report_id: "1"
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
    status: "Unresolved",
    category: "trash_overflow",
    people_reported: 8,
    report_id: "2"
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
    status: "Unresolved",
    category: "trash_overflow",
    people_reported: 12,
    report_id: "3"
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
    status: "Unresolved",
    category: "trash_overflow",
    people_reported: 6,
    report_id: "4"
  },
  {
    id: 5,
    title: "Broken Streetlight",
    location: "Location",
    coordinates: [22.314, 87.31],
    priority: "medium",
    score: 60,
    reportDate: "2024-01-10",
    criticality: "Safety concern during nighttime hours",
    status: "Unresolved",
    category: "potholes",
    people_reported: 4,
    report_id: "5"
  },
];

export const fallbackSummary: FrontendSummary = {
  totalReports: 10,
  highPriorityCount: 3,
  mediumPriorityCount: 3,
  lowPriorityCount: 4,
};
