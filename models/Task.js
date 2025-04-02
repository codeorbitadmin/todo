const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    deadline: String,
    isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);
