import { NextRequest, NextResponse } from "next/server";
import Leave from "@/models/leaveModel";
import { connectDB } from "@/config/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userID, date, leaveType, reason, fullname } = reqBody;

        const newLeave = new Leave({
            userID,
            date,
            leaveType,
            reason,
            fullname
        });

        await newLeave.save();

        return NextResponse.json({
            message: "Application submitted successfully",
            success: true,
            newLeave
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
