import { Router } from "express";
import authRouter from "./authRoutes.js";
import tasksRoutes from "./tasksRoutes.js";
import usersRoutes from "./usersRoutes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);

export default router;
