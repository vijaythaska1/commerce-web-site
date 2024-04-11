import UserModel from "../Model/UserModel.js";
import helper from "../utility/helper.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export default {
    UserCreate: helper.AsyncHanddle(async (req, res) => {
        const validationSchema = Joi.object().required().keys({
            role: Joi.number().integer().valid(0, 1, 2),
            rollNo: Joi.string().required(),
            firstName: Joi.string().required(),
            lastname: Joi.string().required(),
            department: Joi.string().required(),
            status: Joi.number().valid(0, 1),
            gender: Joi.number().valid(0, 1, 2).required(),
            phoneNumber: Joi.number().integer().min(10).required(),
            password: Joi.string().alphanum().min(6).max(100),
            addmessionDate: Joi.date(),
            image: Joi.string().required(),
            document: Joi.string().required(),
            email: Joi.string().email().required(),
            authToken: Joi.string(),
            deviceToken: Joi.string(),
            deviceTypes: Joi.number().integer().valid(0, 1)
        });
        helper.dataValidator(validationSchema, req?.body);
        const { role, rollNo, firstName, lastname, email, phoneNumber, department, gender, status, addmessionDate, image, document, password } = req.body;
        const emailMatch = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
        if (emailMatch) {
            if (emailMatch.email == email && emailMatch.phoneNumber == phoneNumber) {
                return helper.failed(res, "Email or PhoneNumber already exists");
            } else if (emailMatch.email == email) {
                return helper.failed(res, "Email already exists");
            } else if (emailMatch.phoneNumber == phoneNumber) {
                return helper.failed(res, "Phone number already exists");
            }
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ role, rollNo, firstName, lastname, email, phoneNumber, password: hash, department, status, gender, addmessionDate, image, document, });
        return helper.success(res, "User Created Successfully", newUser);
    }),
}

