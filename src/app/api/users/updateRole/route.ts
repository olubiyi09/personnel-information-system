import { connectDB } from "@/config/dbConfig";
// import { getDataFromToken } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request: NextRequest) {
    try {
        const { userId, newRole } = await request.json();
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { role: newRole } },
            { new: true }
        );
        return NextResponse.json({
            message: "User role updated successfully",
            data: updatedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function GET(request: NextRequest) {
    try {
        const users = await User.find({}, '_id role');
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
