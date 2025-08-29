// hooks/use-api.ts
import { useState, useEffect } from 'react';
import { urbanWatchApi, Report } from '@/lib/api';
import { 
  transformReportToIssue, 
  transformPriorityReportToIssue, 
  transformSummaryToStats,
  FrontendIssue,
  FrontendSummary 
} from '@/lib/data-transformers';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook for fetching priority reports
export function usePriorityReports() {
  const [state, setState] = useState<ApiState<FrontendIssue[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchPriorityReports() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await urbanWatchApi.getPriorityReports();
        const issues = response.priority_reports.map(transformPriorityReportToIssue);
        setState({ data: issues, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch priority reports' 
        });
      }
    }

    fetchPriorityReports();
  }, []);

  return state;
}

// Hook for fetching all reports
export function useAllReports() {
  const [state, setState] = useState<ApiState<FrontendIssue[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchAllReports() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await urbanWatchApi.getAllReports();
        const issues = response.reports.map(transformReportToIssue);
        setState({ data: issues, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch reports' 
        });
      }
    }

    fetchAllReports();
  }, []);

  return state;
}

// Hook for fetching reports summary
export function useReportsSummary() {
  const [state, setState] = useState<ApiState<FrontendSummary>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchSummary() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const summary = await urbanWatchApi.getReportsSummary();
        const stats = transformSummaryToStats(summary);
        setState({ data: stats, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch summary' 
        });
      }
    }

    fetchSummary();
  }, []);

  return state;
}

// Hook for fetching single report
export function useReport(reportId: string | null) {
  const [state, setState] = useState<ApiState<FrontendIssue>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!reportId) return;

    async function fetchReport() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await urbanWatchApi.getReportById(reportId!);
        const issue = transformReportToIssue(response.report);
        setState({ data: issue, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch report' 
        });
      }
    }

    fetchReport();
  }, [reportId]);

  return state;
}

// Hook for updating report status
export function useUpdateReportStatus() {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const updateStatus = async (
    reportId: string, 
    status: Report['status'], 
    adminNotes?: string
  ) => {
    try {
      setState({ loading: true, error: null });
      await urbanWatchApi.updateReportStatus(reportId, status, adminNotes);
      setState({ loading: false, error: null });
      return true;
    } catch (error) {
      setState({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update status' 
      });
      return false;
    }
  };

  return { ...state, updateStatus };
}
