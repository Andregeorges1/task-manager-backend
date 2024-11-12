const { Task } = require('../models');

const createTask = async (req, res) => {
    const { title, description, due_date, status } = req.body;
    try {
        const task = await Task.create({ title, description, due_date, status, userId: req.userId });
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.userId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;
    try {
        const task = await Task.findOne({ where: { id, userId: req.userId } });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        Object.assign(task, { title, description, due_date, status });
        await task.save();
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id, userId: req.userId } });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
