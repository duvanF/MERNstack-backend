const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task1 = await Task.findById(req.params.id);
    res.json(task1);
});

router.post('/', async (req, res) => {
    var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const { title, description } = req.body;
    const task = new Task({ title, description});
    task.date = new Date(date + " " + time);
    await task.save();
    res.json({status: 'task saved'});
});

router.put('/:id', async (req, res) =>{
    const { title, description} = req.body;
    const newTask = { title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'task update'});
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'task delete'});
});

module.exports = router;