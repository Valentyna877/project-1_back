import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getAllTasksSchema,
  createTaskSchema,
  taskStatusSchema,
} from "../validations/tasksValidation.js";
import {
  getAllTasks,
  createTask,
  taskDone,
} from "../controllers/tasksController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { taskIdSchema } from "../validations/idValidation.js";

const router = Router();

router.use(authenticate);

router.get("/", celebrate(getAllTasksSchema), getAllTasks);
router.patch(
  "/:taskId/status",
  celebrate(taskStatusSchema, taskIdSchema),
  taskDone,
);
router.post("/", celebrate(createTaskSchema), createTask);

export default router;
