import { Router } from 'express';
import authRouter from './authRoutes.js';
import tasksRoutes from './tasksRoutes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', tasksRoutes);

export default router;
