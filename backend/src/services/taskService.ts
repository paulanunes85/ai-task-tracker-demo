import { AppDataSource } from '../config/database';
import { Task } from '../entities/Task';

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      return null;
    }
    
    Object.assign(task, taskData);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected !== 0;
  }
}