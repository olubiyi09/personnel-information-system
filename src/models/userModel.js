import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please enter your full name"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true
    },

    phone: {
        type: String,
        required: false,
    },

    password: {
        type: String,
        required: [true, "Please enter password"],
    },


    role: {
        type: String,
        required: false,
        default: "unapproved",
    },

    address: {
        type: String,
        required: false,
        default: "",
    },

    dateofbirth: {
        type: String,
        required: false,
        default: "",
    },

    gender: {
        type: String,
        required: false,
        default: "",
    },

    maritalstatus: {
        type: String,
        required: false,
        default: "",
    },

    profileimage: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/dhikuxujd/image/upload/v1712794549/ww9wlfambw2x6dpy0p9r.png",
    },

    position: {
        type: String,
        required: false,
        default: "",
    },

    experience: {
        type: [],
        required: false,
        default: [],
    },
    position: {
        type: String,
        required: false,
    },
    experience: {
        type: [],
        required: false,
    },
}, {
    timestamps: true,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
