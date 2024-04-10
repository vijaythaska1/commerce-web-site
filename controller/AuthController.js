import UserModel from "../Model/UserModel.js";
import dotenv from 'dotenv';
import helper from "../utility/helper.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})
export default {
    changepassword: helper.TryCatchHanddler(async (req, res) => {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const data = await UserModel.find({ oldPassword });
        const match = await bcrypt.compare(password, data.password);
        if (!match) { return helper.failed(res, "Invalid current password"); };
        if (!newPassword !== confirmPassword) { return helper.failed(res, "New password and confirm password do not match") };
        const hashedPassword = await bcrypt.hash(match.password, 10);
        data.password = hashedPassword;
        await data.save();
        helper.success(res, "Password Change successfully");
    }),

    login: helper.TryCatchHanddler(async (req, res) => {
        const { email, password } = req.body;
        const data = await UserModel.findOne({ email });
        if (!data) { return helper.failed(res, "Invalid Email") };
        const match = await bcrypt.compare(password, data.password);
        const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        data.authToken = token;
        await data.save();
        if (!match) { return helper.failed(res, "Invalid Password") };
        return helper.success(res, "login Successfully", data, token);
    })


}