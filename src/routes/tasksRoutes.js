import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getAllTasksSchema,
  createTaskSchema,
  taskDoneSchema,
} from "../validations/tasksValidation.js";
import {
  getAllTasks,
  createTask,
  taskDone,
} from "../controllers/tasksController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", celebrate(getAllTasksSchema), getAllTasks);
router.patch("/status", celebrate(taskDoneSchema), taskDone);
router.post("/", celebrate(createTaskSchema), createTask);

export default router;
