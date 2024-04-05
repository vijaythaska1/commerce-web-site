import UserModel from "../Model/UserModel.js";
import helper from "../utility/helper.js";

export default {
    UserCreate: helper.TryCatchHanddler(async (req, res) => {
        const { role, name, email, password, } = req.body;
        const User = await UserModel.create({
            role, name, email, password,
        });
        helper.success(res, "User Create Successfully", User)
    }),
    
}