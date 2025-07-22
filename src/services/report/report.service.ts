import api from '../../api/axios.config';

export interface APIReport {
  id: string;
  description: string;
  typeReport: 'posible_traidor' | 'asesinato';
  state: 'en_proceso' | 'aprobado' | 'rechazado';
  fileUrl?: string; // Changed from evidence to fileUrl
  userId: string;
  user: {
    id: string;
    fullName: string;
    alias: string;
    email: string;
    role: string;
  };
  traidorId?: string;
  traidor?: {
    id: string;
    fullName: string;
    alias: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateReportRequest {
  userId: string;
  traidorId: string;
  typeReport: 'posible_traidor' | 'asesinato';
  description: string;
}

export interface UpdateReportRequest {
  title?: string;
  description?: string;
  typeReport?: 'posible_traidor' | 'asesinato';
  state?: 'en_proceso' | 'aprobado' | 'rechazado';
  reward?: string; // Changed from number to string
}

export interface UploadReportRequest {
  userId: string;
  traidorId: string;
  typeReport: 'posible_traidor' | 'asesinato';
  description: string;
}

export interface ApproveReportResponse {
  report: APIReport;
  reassignedMissions?: Array<{
    missionId: string;
    missionCodeName: string;
    objective: string;
    formerCaptain: string;
  }>;
}

export const reportService = {
  // Get all reports
  async getAllReports(): Promise<APIReport[]> {
    const response = await api.get('/reports');
    return response.data;
  },

  // Get report by ID
  async getReportById(id: string): Promise<APIReport> {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  // Get reports by state
  async getReportsByState(state: 'en_proceso' | 'aprobado' | 'rechazado'): Promise<APIReport[]> {
    const response = await api.get(`/reports/state/${state}`);
    return response.data;
  },

  // Get reports by type
  async getReportsByType(type: 'posible_traidor' | 'asesinato'): Promise<APIReport[]> {
    const response = await api.get(`/reports/type/${type}`);
    return response.data;
  },

  // Get reports by user (reporter)
  async getReportsByUser(userId: string): Promise<APIReport[]> {
    const response = await api.get(`/reports/user/${userId}`);
    return response.data;
  },

  // Get reports by traidor (reported user)
  async getReportsByTraidor(traidorId: string): Promise<APIReport[]> {
    const response = await api.get(`/reports/traidor/${traidorId}`);
    return response.data;
  },

  // Create a new report
  async createReport(reportData: CreateReportRequest): Promise<APIReport> {
    const response = await api.post('/reports', reportData);
    return response.data;
  },

  // Upload a report with file evidence
  async uploadReport(reportData: UploadReportRequest, file: File): Promise<APIReport> {
    const formData = new FormData();
    
    // Append report data
    Object.entries(reportData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    
    // Append file
    formData.append('file', file);

    const response = await api.post('/reports/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update a report
  async updateReport(id: string, reportData: UpdateReportRequest): Promise<APIReport> {
    const response = await api.patch(`/reports/${id}`, reportData);
    return response.data;
  },

  // Approve a report with optional reward
  async approveReport(id: string, updateData?: UpdateReportRequest): Promise<ApproveReportResponse> {
    const response = await api.patch(`/reports/${id}/approve`, updateData || {});
    return response.data;
  },

  // Reject a report
  async rejectReport(id: string): Promise<APIReport> {
    const response = await api.patch(`/reports/${id}/reject`);
    return response.data;
  },

  // Restore a deleted report
  async restoreReport(id: string): Promise<{ message: string }> {
    const response = await api.patch(`/reports/${id}/restore`);
    return response.data;
  },

  // Delete a report
  async deleteReport(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },
};