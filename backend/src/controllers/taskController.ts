import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/taskService';
import { AIService } from '../services/aiService';

export class TaskController {
  private taskService: TaskService;
  private aiService: AIService;

  constructor() {
    this.taskService = new TaskService();
    this.aiService = new AIService();
  }

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      
      // Get AI suggestions
      const aiAnalysis = await this.aiService.analyzeTask(title, description);
      
      const task = await this.taskService.createTask({
        title,
        description,
        category: aiAnalysis.category,
        priority: aiAnalysis.priority,
        ai_suggested_category: aiAnalysis.category,
        ai_suggested_priority: aiAnalysis.priority,
      });
      
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.taskService.deleteTask(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getAISuggestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      const suggestions = await this.aiService.analyzeTask(title, description);
      res.json(suggestions);
    } catch (error) {
      next(error);
    }
  };
}