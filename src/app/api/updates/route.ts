import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/updatesModel";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { title, content } = reqBody;

        const newPost = new Post({
            title,
            content,
        });

        await newPost.save();

        console.log(newPost);

        return NextResponse.json({
            message: "Post saved successfully",
            success: true,
            newPost,
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}




export async function GET(request: NextRequest) {
    try {
        const allPosts = await Post.find();
        return NextResponse.json({
            message: "All posts fetched successfully",
            success: true,
            data: allPosts,
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}



export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { postId } = reqBody;

        if (!postId) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Post deleted successfully",
            success: true,
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { postId, title, content } = reqBody;

        if (!postId) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });

        if (!updatedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Post updated successfully",
            success: true,
            updatedPost,
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}