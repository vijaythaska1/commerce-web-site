import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    role: {
        type: Number,
        enum: [0, 1, 2], //0 Student 1 Tacher 3 Admin
        default: 1
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    }
},
    { timestamps: true }
);
export default mongoose.model("users", UserModel);