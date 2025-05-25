import React, { useState } from 'react';
import { Task } from '../types';
import { updateTask, deleteTask } from '../services/api';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: Task['status']) => {
    setIsUpdating(true);
    try {
      await updateTask(task.id, { status: newStatus });
      onUpdate();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        onUpdate();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  const categoryColors = {
    Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Urgent: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Learning: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  };

  return (
    <div className="card p-4 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {task.title}
        </h3>
        <button
          onClick={handleDelete}
          className="ml-2 text-gray-400 hover:text-red-600 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {task.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}>
          {task.category}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority} Priority
        </span>
        
        {task.ai_suggested_category && task.ai_suggested_category !== task.category && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            AI: {task.ai_suggested_category}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          disabled={isUpdating}
          className="text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 py-1 px-2 focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="pending">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(task.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};