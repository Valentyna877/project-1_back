import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllTasksSchema,
  createTaskSchema,
  taskDoneSchema,
} from '../validations/tasksValidation.js';
import {
  getAllTasks,
  createTask,
  taskDone,
} from '../controllers/tasksController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/tasks', celebrate(getAllTasksSchema), getAllTasks);
router.post('/tasks', celebrate(createTaskSchema), createTask);
router.patch('/tasks/:taskId', celebrate(taskDoneSchema), taskDone);

export default router;
