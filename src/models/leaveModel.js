import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User ID is required"],
    },
    date: {
        type: Date,
        required: [true, "Please enter the date for leave"],
    },
    leaveType: {
        type: String,
        required: [true, "Please enter the leave type"],
    },
    applicationStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    fullname: {
        type: String,
        required: [true, "Please enter your full name"],
        unique: true
    },
    reason: {
        type: String,
        required: [true, "Please enter the reason for the leave"],
    },
}, {
    timestamps: true,
});

const Leave = mongoose.models.Leave || mongoose.model("Leave", leaveSchema);

export default Leave;


