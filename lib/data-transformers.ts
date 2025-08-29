// lib/data-transformers.ts
import { Report, PriorityReport, ReportsSummary } from './api';

// Interface for the frontend issue format
export interface FrontendIssue {
  id: number;
  title: string;
  location: string;
  coordinates: [number, number];
  priority: 'high' | 'medium' | 'low';
  score: number;
  reportDate?: string;
  criticality?: string;
  status?: string;
  category?: string;
  ai_analysis?: string;
  images?: string[];
  people_reported?: number;
  report_id?: string;
}

// Map criticality score to priority level
export function mapCriticalityToPriority(score: number): 'high' | 'medium' | 'low' {
  if (score >= 71) return 'high';
  if (score >= 41) return 'medium';
  return 'low';
}

// Transform API report to frontend issue format
export function transformReportToIssue(report: Report): FrontendIssue {
  return {
    id: parseInt(report.report_id) || Math.random() * 1000000,
    title: report.title,
    location: report.location.address,
    coordinates: [report.location.lat, report.location.lon],
    priority: mapCriticalityToPriority(report.criticality_score),
    score: report.criticality_score,
    reportDate: new Date(report.created_at).toLocaleDateString(),
    criticality: getCriticalityDescription(report.criticality_score, report.category),
    status: formatStatus(report.status),
    category: report.category,
    ai_analysis: report.ai_analysis,
    images: report.images,
    people_reported: report.people_reported,
    report_id: report.report_id,
  };
}

// Transform priority report to frontend issue format
export function transformPriorityReportToIssue(report: PriorityReport): FrontendIssue {
  return {
    id: parseInt(report.report_id) || Math.random() * 1000000,
    title: report.title,
    location: report.location.address,
    coordinates: [report.location.lat, report.location.lon],
    priority: mapCriticalityToPriority(report.criticality_score),
    score: report.criticality_score,
    reportDate: new Date(report.created_at).toLocaleDateString(),
    criticality: getCriticalityDescription(report.criticality_score, 'unknown'),
    people_reported: report.people_reported,
    report_id: report.report_id,
  };
}

// Generate criticality description based on score and category
function getCriticalityDescription(score: number, category: string): string {
  const priority = mapCriticalityToPriority(score);
  const categoryText = category === 'potholes' ? 'pothole' : 
                      category === 'trash_overflow' ? 'waste accumulation' : 'issue';
  
  if (priority === 'high') {
    return `High-priority ${categoryText} requiring immediate attention`;
  } else if (priority === 'medium') {
    return `Moderate ${categoryText} that needs attention`;
  } else {
    return `Minor ${categoryText} with low impact`;
  }
}

// Format API status to user-friendly text
function formatStatus(status: string): string {
  switch (status) {
    case 'waiting_for_attention':
      return 'Unresolved';
    case 'got_the_attention':
      return 'In Progress';
    case 'resolved':
      return 'Resolved';
    default:
      return 'Unknown';
  }
}

// Transform summary data for stats card
export interface FrontendSummary {
  totalReports: number;
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
}

export function transformSummaryToStats(summary: ReportsSummary): FrontendSummary {
  return {
    totalReports: summary.total_active,
    highPriorityCount: summary.by_criticality.high,
    mediumPriorityCount: summary.by_criticality.medium,
    lowPriorityCount: summary.by_criticality.low,
  };
}
