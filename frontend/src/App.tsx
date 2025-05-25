import React, { useState } from 'react';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { useQuery } from 'react-query';
import { getTasks } from './services/api';
import { Task } from './types';

function App() {
  const [showForm, setShowForm] = useState(false);
  const { data: tasks = [], isLoading, refetch } = useQuery<Task[]>('tasks', getTasks);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Tasks
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              AI-powered task management for better productivity
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            + New Task
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <TaskForm
              onSuccess={() => {
                setShowForm(false);
                refetch();
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <TaskList tasks={tasks} onUpdate={refetch} />
        )}
      </main>
    </div>
  );
}

export default App;