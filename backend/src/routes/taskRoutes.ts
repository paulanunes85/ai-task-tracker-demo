import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { validateCreateTask, validateUpdateTask } from '../middleware/validation';

const router = Router();
const taskController = new TaskController();

// Get all tasks
router.get('/', taskController.getAllTasks);

// Get single task
router.get('/:id', taskController.getTaskById);

// Create task
router.post('/', validateCreateTask, taskController.createTask);

// Update task
router.put('/:id', validateUpdateTask, taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

// AI suggestions endpoint
router.post('/ai-suggest', taskController.getAISuggestions);

export default router;