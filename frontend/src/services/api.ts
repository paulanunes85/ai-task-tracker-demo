import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/api/tasks');
  return data;
};

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  const { data } = await api.post('/api/tasks', task);
  return data;
};

export const updateTask = async (id: string, task: UpdateTaskDto): Promise<Task> => {
  const { data } = await api.put(`/api/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};

export const getAISuggestions = async (title: string, description?: string) => {
  const { data } = await api.post('/api/tasks/ai-suggest', { title, description });
  return data;
};