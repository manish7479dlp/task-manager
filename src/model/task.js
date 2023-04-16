const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    reference: {
        type: String,
        trime: true,
        required: true
    }
})

const taskModel =  mongoose.model("task" , taskSchema);

module.exports = taskModel;