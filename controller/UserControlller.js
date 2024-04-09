import UserModel from "../Model/UserModel.js";
import helper from "../utility/helper.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export default {
    UserCreate: helper.AsyncHanddle(async (req, res) => {
        // const validationSchema = Joi.object().keys({
        //     name: Joi.string().required(),
        //     role: Joi.string().required(),
        //     email: Joi.string().email().required(),
        //     password: Joi.string().required()
        // });
        // helper.dataValidator(validationSchema, req.body);


        const { role, name, email, phoneNumber, password } = req.body;
        const emailmacth = await UserModel.find({$or :[{email}, {phoneNumber}]});
        if(emailmacth){
            return helper.failed(res,"Email or phone number already exists")
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ role, name, email, phoneNumber, password: hash });
        helper.success(res, "User Created Successfully", newUser);
    }),
}
