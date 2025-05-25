import React from 'react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onUpdate: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate }) => {
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-8">
      <TaskSection title="To Do" tasks={pendingTasks} onUpdate={onUpdate} />
      <TaskSection title="In Progress" tasks={inProgressTasks} onUpdate={onUpdate} />
      <TaskSection title="Completed" tasks={completedTasks} onUpdate={onUpdate} />
    </div>
  );
};

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onUpdate: () => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, tasks, onUpdate }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title} ({tasks.length})
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};