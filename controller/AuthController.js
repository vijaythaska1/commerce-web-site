import UserModel from "../Model/UserModel";
import helper from "../utility/helper";
import bcrypt from "bcrypt";
export default {
    changepassword: helper.TryCatchHanddler(async (req, res) => {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const data = await UserModel.find({ oldPassword });
        const match = await bcrypt.compare(password, data.password);
        if (!match) {
            return helper.failed(res, "Invalid current password");
        };
        if (!newPassword !== confirmPassword) {
            return helper.failed(res, "New password and confirm password do not match");
        };
        const hashedPassword = await bcrypt.hash(match.password, 10)
        data.password = hashedPassword;
        await data.save();
        helper.success(res, "Password Change successfully")
    }),

    login: helper.TryCatchHanddler(async (res, res) => {
        const data = await UserModel.find();
})
}