import { Router } from "express";
import authRouter from "./authRoutes.js";
import tasksRoutes from "./tasksRoutes.js";
import usersRoutes from "./usersRoutes.js";
import weeksRoutes from './weeksRoutes.js';

const router = Router();

router.use("/auth", authRouter);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);
router.use('/weeks', weeksRoutes);

export default router;
