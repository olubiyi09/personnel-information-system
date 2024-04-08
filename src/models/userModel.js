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


    // // Extra fields for employer
    // establishmentYear: {
    //     type: String,
    //     required: false,
    // },
    // companySize: {
    //     type: String,
    //     required: false,
    // },
    // website: {
    //     type: String,
    //     required: false,
    // },
    // about: {
    //     type: String,
    //     required: false,
    // },
    // address: {
    //     type: String,
    //     required: false,
    // },
}, {
    timestamps: true,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
