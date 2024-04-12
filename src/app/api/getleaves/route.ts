import { connectDB } from "@/config/dbConfig";
import Leave from "@/models/leaveModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const leaves = await Leave.find({});
        console.log(leaves);
        return NextResponse.json({
            message: "Leaves found",
            data: leaves
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const { userId, applicationStatus } = await request.json();

        if (!userId || !applicationStatus) {
            throw new Error("ID and applicationStatus are required.");
        }

        const leave = await Leave.findById(userId);

        if (!leave) {
            return NextResponse.json({ error: "Leave not found" }, { status: 404 });
        }

        leave.applicationStatus = applicationStatus;
        await leave.save();

        return NextResponse.json({
            message: "Leave updated successfully",
            data: leave
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}