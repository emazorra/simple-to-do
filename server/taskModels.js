const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: { type: String, required: true },
    date: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false }
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;