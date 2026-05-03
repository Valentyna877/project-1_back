import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getAllTasksSchema,
  createTaskSchema,
  taskStatusSchema,
  taskUpdateSchema,
} from "../validations/tasksValidation.js";
import {
  getAllTasks,
  createTask,
  taskDone,
  deleteTask,
  updateTask,
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
router.delete("/:taskId", celebrate(taskIdSchema), deleteTask);
router.patch("/:taskId", celebrate(taskUpdateSchema, taskIdSchema), updateTask);

export default router;
