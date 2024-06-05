import Model from "../Model/index.js";
import helper from "../utility/helper.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export default {
    UserCreate: helper.AsyncHanddle(async (req, res) => {
        const validationSchema = Joi.object({
            role: Joi.number().integer().valid(0, 1, 2).required(),
            rollNo: Joi.number().allow(null),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            department: Joi.string().required(),
            gender: Joi.number().valid(0, 1, 2).required(),
            registrationNo: Joi.number().integer().allow(null),
            countryCode: Joi.string().required(),
            phoneNumber: Joi.number().integer().required(),
            password: Joi.string().alphanum().min(6).max(100).required(),
            image: Joi.string().required(),
            documents: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    image: Joi.string().required(),
                })
            ),
            email: Joi.string().email().required(),
            authToken: Joi.string().allow(""),
            deviceToken: Joi.string().allow(""),
            deviceType: Joi.number().integer().valid(0, 1, 2),
        });
        helper.dataValidator(validationSchema, req?.body);
        const {
            role,
            rollNo,
            firstName,
            lastName,
            email,
            countryCode,
            phoneNumber,
            registrationNo,
            department,
            gender,
            image,
            password,
        } = req.body;
        const emailMatch = await Model.UserModel.findOne({
            $or: [{ email }, { phoneNumber }],
        });
        if (emailMatch) {
            if (emailMatch.email === email && emailMatch.phoneNumber === phoneNumber) {
                return helper.failed(res, "Email or PhoneNumber already exists");
            } else if (emailMatch.email === email) {
                return helper.failed(res, "Email already exists");
            } else if (emailMatch.phoneNumber === phoneNumber) {
                return helper.failed(res, "Phone number already exists");
            }
        };
        const parseddocuments = (req.body.documents?.includes(",") ? req.body.documents.split(',').map(id => id.trim()) : [req.body.documents]);
        const hash = await bcrypt.hash(password, 10);
        const newUser = await Model.UserModel.create({
            role,
            rollNo,
            firstName,
            lastName,
            email,
            registrationNo,
            countryCode,
            phoneNumber,
            password: hash,
            department,
            gender,
            image,
            documents: parseddocuments,
        });
        return helper.success(res, "User Created Successfully", newUser);
    }),
};