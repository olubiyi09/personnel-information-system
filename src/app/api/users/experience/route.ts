import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();
        const { userId, company, position, duration } = formData;

        if (!userId || !company || !position || !duration) {
            throw new Error('All fields are required');
        }

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Create a new experience object
        const newExperience = {
            company,
            position,
            duration,
        };

        // Update the user's experience array
        user.experience.push(newExperience);

        // Save the updated user
        const savedUser = await user.save();

        return NextResponse.json({
            message: "Experience added successfully",
            data: savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const { userId, experience } = await request.json();
        // console.log(experience);


        if (!userId || !experience) {
            throw new Error('User ID and experience data are required');
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.experience = experience;
        const updatedUser = await user.save();

        return NextResponse.json({
            message: "Experience updated successfully",
            data: updatedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
