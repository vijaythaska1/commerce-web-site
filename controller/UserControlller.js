import UserModel from "../Model/UserModel.js";
import helper from "../utility/helper.js";
import Joi from "joi";

export default {
    UserCreate: helper.AsyncHanddle(async (req, res) => {
        const validationSchema = Joi.object().required().keys({ name: Joi.string().required() });
        helper.dataValidator(validationSchema, req.body);
        const { role, name, email, password } = req.body;
        const User = await UserModel.create({ role, name, email, password });
        helper.success(res, "User Created Successfully", User);
    }),
}
