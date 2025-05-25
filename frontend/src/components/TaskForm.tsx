import React, { useState } from 'react';
import { createTask, getAISuggestions } from '../services/api';
import { CreateTaskDto } from '../types';

interface TaskFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<CreateTaskDto>({
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      await createTask(formData);
      onSuccess();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const analyzeWithAI = async () => {
    if (!formData.title.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const suggestions = await getAISuggestions(formData.title, formData.description);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 animate-slide-in">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Create New Task
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input"
            placeholder="e.g., Review quarterly financial report"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input"
            rows={3}
            placeholder="Add more details..."
          />
        </div>
        
        {formData.title && (
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={analyzeWithAI}
              disabled={isAnalyzing}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              {isAnalyzing ? 'Analyzing...' : '🤖 Get AI Suggestions'}
            </button>
            
            {aiSuggestions && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                AI suggests: 
                <span className="font-medium text-gray-900 dark:text-white">
                  {aiSuggestions.category} - {aiSuggestions.priority} Priority
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};