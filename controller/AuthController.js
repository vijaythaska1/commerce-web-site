import Model from "../Model/index.js"
import dotenv from 'dotenv';
import helper from "../utility/helper.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import Joi from "joi";
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});
export default {
    changepassword: helper.TryCatchHanddler(async (req, res) => {
        const validationSchema = Joi.object().required().keys({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().min(6).alphanum().required(),
            confirmPassword: Joi.string().required()
        })
        helper.dataValidator(validationSchema, req?.body)
        const { oldPassword, newPassword, confirmPassword } = req?.body;
        const data = await Model.UserModel.findOne(req.user._id);
        const match = await bcrypt.compare(oldPassword, data.password);
        if (!match) { return helper.failed(res, "Invalid current password") };
        if (newPassword != confirmPassword) { return helper.failed(res, "New password and confirm password do not match") };
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        data.password = hashedPassword;
        await data.save();
        helper.success(res, "Password Change successfully", data);
    }),

    login: helper.TryCatchHanddler(async (req, res) => {
        const validationSchema = Joi.object().required().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
        helper.dataValidator(validationSchema, req?.body);
        const { email, password } = req.body;
        const data = await Model.UserModel.findOne({ email });
        if (!data) { return helper.failed(res, "Invalid Email") };
        const match = await bcrypt.compare(password, data.password);
        const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        data.authToken = token;
        await data.save();
        if (!match) { return helper.failed(res, "Invalid Password") };
        return helper.success(res, "login Successfully", data, token);
    }),

    adminprofile: helper.TryCatchHanddler(async (req, res) => {
        const data = await UserModel.findOne(req.user._id);
        helper.success(res, "Profile Get Successfully", data);
    }),


}