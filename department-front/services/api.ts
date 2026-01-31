// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; message?: string; errors?: any }> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Student API methods
  async getStudents(params: {
    page?: number;
    per_page?: number;
    search?: string;
    payment_status?: string;
    onboarding_status?: string;
    program_id?: number;
    overdue?: boolean;
    due_soon?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  } = {}) {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, value.toString());
      }
    });

    return this.request(`/students?${queryString.toString()}`);
  }

  async getStudent(id: string) {
    return this.request(`/students/${id}`);
  }

  async createStudent(data: {
    name: string;
    email: string;
    discord_handle?: string;
    program_id: number;
    payment_status?: 'Paid' | 'Pending' | 'Failed';
    onboarding_status?: 'Not Started' | 'In Progress' | 'Completed';
    joined_date?: string;
    due_date: string;
  }) {
    return this.request('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStudent(id: string, data: Partial<{
    name: string;
    email: string;
    discord_handle: string;
    program_id: number;
    payment_status: 'Paid' | 'Pending' | 'Failed';
    onboarding_status: 'Not Started' | 'In Progress' | 'Completed';
    discord_role_assigned: boolean;
    joined_date: string;
    due_date: string;
    last_reminder_sent: string;
  }>) {
    return this.request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStudent(id: string) {
    return this.request(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  async updateOnboardingStatus(id: string, onboarding_status: 'Not Started' | 'In Progress' | 'Completed') {
    return this.request(`/students/${id}/onboarding-status`, {
      method: 'PATCH',
      body: JSON.stringify({ onboarding_status }),
    });
  }

  async updateTimelineStep(studentId: string, stepId: string, data: {
    status?: 'completed' | 'current' | 'pending' | 'failed';
    timestamp_label?: string;
  }) {
    return this.request(`/students/${studentId}/timeline/${stepId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getStudentStats() {
    return this.request('/students/stats');
  }

  async bulkUpdateStudents(ids: string[], data: {
    payment_status?: 'Paid' | 'Pending' | 'Failed';
    onboarding_status?: 'Not Started' | 'In Progress' | 'Completed';
  }) {
    return this.request('/students/bulk-update', {
      method: 'POST',
      body: JSON.stringify({ ids, ...data }),
    });
  }

  // System Logs API methods
  async getLogs(params: {
    search?: string;
    level?: string;
    module?: string;
  } = {}) {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryString.append(key, value.toString());
      }
    });
    return this.request(`/logs?${queryString.toString()}`);
  }

  async createLog(data: {
    level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    module: string;
    message: string;
    context?: Record<string, any>;
    student_id?: number;
  }) {
    return this.request('/logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async clearOldLogs() {
    return this.request('/logs/clear', {
      method: 'DELETE',
    });
  }

  async getLogStats() {
    return this.request('/logs/stats');
  }

  // Transactions/Payments API methods
  async getTransactions(params: {
    search?: string;
    status?: string;
    method?: string;
  } = {}) {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryString.append(key, value.toString());
      }
    });
    return this.request(`/transactions?${queryString.toString()}`);
  }

  async createTransaction(data: {
    student_name: string;
    amount: number;
    method: 'Stripe' | 'PayPal' | 'Bank Transfer' | 'Crypto';
    status: 'Verified' | 'Pending' | 'Failed';
  }) {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTransactionStatus(id: string, status: 'Verified' | 'Pending' | 'Failed') {
    return this.request(`/transactions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteTransaction(id: string) {
    return this.request(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;