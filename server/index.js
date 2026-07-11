const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const Task = require('../server/taskModels');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to Mongo DB'))
.catch((err) => console.log('MongoDB connection error: ', err ));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/tasks', async (req, res) => {

    try {
        const { task } = req.body;

        const newTask = await Task.create({ task });

        return res.status(201).json(newTask);

    } catch (err) {
        return res.status(500).json(err.message);
    }
});

app.get('/tasks', async (req, res) => {

    try {
        const allTasks = await Task.find({ });

        return res.status(200).json(allTasks);
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

app.patch('/tasks/:_id', async (req, res) => {

    try {
        const { _id } = req.params;

        const editTask = await Task.findByIdAndUpdate( _id, req.body, { new: true })

        return res.status(200).json(editTask);

    } catch (err) {
        return res.status(500).json(err.message);
    }

})

app.delete('/tasks/:_id', async (req, res) => {

    try {

        const { _id } = req.params;

        const deleteTask = await Task.findByIdAndDelete(_id)

        return res.status(200).json(`Task ${_id} is deleted.`)

    } catch (err) {
        return res.status(500).json(err.message);
    }
})


app.listen(PORT || 3000, () => {
    console.log(`Server listening on port: ${PORT}...`)
});