import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    role: {
        type: Number,
        enum: [0, 1, 2], //0 Student 1 Tacher 3 Admin
        default: 1
    },
    rollNo: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    department: {
        type: String,
        default: ""
    },
    gender: {
        type: Number,
        enum: [0, 1, 3],
    },
    moblie: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        default: "",
    },
    phoneNumber: {
        type: Number,
        required: true,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    addmessionDate: {
        type: Date,
    },
    joining: {
        type: String,
        default: ""
    },
    authToken: {
        type: String,
        default: "",
    },
    deviceToken: {
        type: String,
        default: "",
    },
    deviceTypes: {
        type: Number,
        enum: [0, 1, 2], // 0: android, 1: iOS 2: website
        default: 2, // Default to android
    },
},
    { timestamps: true }
);
export default mongoose.model("users", UserModel);