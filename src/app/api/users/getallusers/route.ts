import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest) {

    try {
        const users = await User.find({}).select("-password");
        return NextResponse.json({
            message: "Users found",
            data: users
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}
