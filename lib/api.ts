// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://urbanwatch.tech';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface Report {
  report_id: string;
  user_ids: string[];
  people_reported: number;
  category: 'potholes' | 'trash_overflow';
  title: string;
  ai_analysis: string;
  images: string[];
  location: {
    lat: number;
    lon: number;
    address: string;
  };
  criticality_score: number;
  status: 'waiting_for_attention' | 'got_the_attention' | 'resolved';
  created_at: string;
  updated_at: string;
}

interface PriorityReport {
  report_id: string;
  title: string;
  criticality_score: number;
  people_reported: number;
  location: {
    lat: number;
    lon: number;
    address: string;
  };
  created_at: string;
}

interface ReportsSummary {
  total_active: number;
  by_criticality: {
    low: number;
    medium: number;
    high: number;
  };
  by_status: {
    waiting_for_attention: number;
    got_the_attention: number;
  };
  by_category: {
    potholes: number;
    trash_overflow: number;
  };
}

interface ReportsListResponse {
  reports: Report[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

// Helper function for API calls with proper error handling and logging
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  console.log(`🌐 API Call: ${options.method || 'GET'} ${url}`);
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();
    console.log(`✅ API Success: ${data.message}`);
    
    return data.data;
  } catch (error) {
    console.error(`💥 API Exception:`, error);
    throw error;
  }
}

// API Functions
export const urbanWatchApi = {
  // Get priority reports for dashboard
  async getPriorityReports(): Promise<{ priority_reports: PriorityReport[] }> {
    return apiCall('/api/v1/admin/priority-reports');
  },

  // Get all reports with optional filtering
  async getAllReports(params?: {
    status?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<ReportsListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.status) searchParams.set('status', params.status);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const query = searchParams.toString();
    const endpoint = `/api/v1/admin/reports${query ? `?${query}` : ''}`;
    
    return apiCall(endpoint);
  },

  // Get single report by ID
  async getReportById(reportId: string): Promise<{ report: Report }> {
    return apiCall(`/api/v1/admin/reports/${reportId}`);
  },

  // Update report status
  async updateReportStatus(
    reportId: string, 
    status: Report['status'], 
    adminNotes?: string
  ): Promise<{ report: Report }> {
    return apiCall(`/api/v1/admin/reports/${reportId}/status`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
        admin_notes: adminNotes,
      }),
    });
  },

  // Get reports summary for stats
  async getReportsSummary(): Promise<ReportsSummary> {
    return apiCall('/api/v1/admin/reports/summary');
  },
};

export type { Report, PriorityReport, ReportsSummary, ReportsListResponse };
