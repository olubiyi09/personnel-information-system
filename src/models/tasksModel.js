import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User ID is required"],
    },
    title: {
        type: String,
        required: [true, "Please enter the task title"],
    },
    description: {
        type: String,
        required: [true, "Please enter the task description"],
    },
    assignedTo: {
        type: String,
        required: [true, "Please select the person to assign the task to"],
    },
    status: {
        type: String,
        enum: ["Pending", "InProgress", "Completed"],
        default: "Pending",
    },
}, {
    timestamps: true,
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;

