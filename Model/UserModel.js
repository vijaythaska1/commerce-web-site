import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        role: { type: Number, enum: [0, 1, 2], default: 1, required: true }, // 0: Admin, 1: Teacher, 2: Student
        rollNo: { type: String, default: null },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        department: { type: String, required: true },
        gender: { type: Number, enum: [0, 1, 2], required: true }, // 0: Male, 1: Female, 2: Other
        email: { type: String, required: true, unique: true },
        countryCode: { type: String, required: true },
        phoneNumber: { type: Number, required: true, unique: true },
        registrationNo: { type: Number },
        password: { type: String, required: true },
        status: { type: Number, enum: [0, 1], default: 0 }, // 0: Active, 1: Inactive
        joiningDate: { type: Date, default: Date.now() },
        image: { type: String, required: true },
        documents: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
            },
        ],
        authToken: { type: String, default: "" },
        deviceToken: { type: String, default: "" },
        deviceType: { type: Number, enum: [0, 1, 2], default: 2 }, // 0: Android, 1: iOS, 2: Website
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;