import { Task } from '../models/task.js';

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user._id });
  res.status(201).json(task);
};