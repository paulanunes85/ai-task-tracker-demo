export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'in_progress' | 'completed';
  ai_suggested_category?: string;
  ai_suggested_priority?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
}

export interface AIAnalysisResult {
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  reasoning?: string;
}