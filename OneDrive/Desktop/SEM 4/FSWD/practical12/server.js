require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./model/Task');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const { status, dueDate } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };
        const tasks = await Task.find(filter);
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});