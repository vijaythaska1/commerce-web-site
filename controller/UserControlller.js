import UserModel from "../Model/UserModel.js";
import helper from "../utility/helper.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export default {
    UserCreate: helper.AsyncHanddle(async (req, res) => {

        const validationSchema = Joi.object().required().keys({
            role: Joi.number().valid(1, 2),
            name: Joi.string().required(),
            email:Joi.string().email().required(),
            phoneNumber:Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
            password: Joi.string().min(6).max(100),
            deviceToken: Joi.string(),
            deviceTypes: Joi.number().valid(0, 1)
        });
        helper.dataValidator(validationSchema, req?.body);
        const { role, name, email, phoneNumber, password } = req.body;
        const emailMatch = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
        if (emailMatch) {
            if (emailMatch?.email == req.body.email && emailMatch?.phoneNumber == req.body.phoneNumber) {
                return helper.failed(res, "Email or PhoneNumber already exists");
            } else if (emailMatch?.email === req.body.email) {
                return helper.failed(res, "Email already exists");
            } else if (emailMatch?.phoneNumber === req.body.phoneNumber) {
                return helper.failed(res, "Phone number already exists");
            }
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ role, name, email, phoneNumber, password: hash });
        return helper.success(res, "User Created Successfully", newUser);
    }),
}


// const validationSchema = Joi.object().keys({
//     name: Joi.string().required(),
//     role: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required()
// });
// helper.dataValidator(validationSchema, req.body);