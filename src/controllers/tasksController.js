import { Task } from '../models/task.js';
import createHttpError from 'http-errors';

export const getAllTasks = async (req, res) => {
  const { _id: loggedUser } = req.user;
  const result = await Task.find({ loggedUser });
  res.status(200).json(result);
};

export const taskDone = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId: req.user._id },
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );
  if (!task) {
    throw createHttpError(404, 'Task not found');
  }
  res.status(200).json(task);
};
