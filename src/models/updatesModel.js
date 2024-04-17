import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the post title"],
    },
    content: {
        type: String,
        required: [true, "Please enter the post content"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

