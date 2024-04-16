import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/tasksModel";
import { connectDB } from "@/config/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userID, title, description, assignedTo } = reqBody;

        const newTask = new Task({
            userID,
            title,
            description,
            assignedTo,
        });

        await newTask.save();

        return NextResponse.json({
            message: "Task created successfully",
            success: true,
            newTask,
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        const tasks = await Task.find();
        return NextResponse.json({ tasks });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const { taskId, status } = await request.json();

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true }
        );

        if (!updatedTask) {
            return NextResponse.json(
                { message: "Task not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Task status updated successfully",
            success: true,
            updatedTask,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}