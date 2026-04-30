import { Task } from "../models/task.js";
import createHttpError from "http-errors";

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user._id });
  res.status(201).json(task);
};

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).sort({
    date: 1,
  });
  res.status(200).json(tasks);
};

export const taskDone = async (req, res) => {
  const { taskId } = req.params;
  const { isDone } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId: req.user._id },
    { isDone },
    { new: true },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!task) {
    throw createHttpError(404, "Task not found");
  }
  res.status(200).json(task);
};
