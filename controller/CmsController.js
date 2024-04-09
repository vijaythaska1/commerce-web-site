import CmsModel from "../Model/CmsModel.js"
import helper from "../utility/helper"

export default {
    CMSGet: helper.TryCatchHanddler(async (req, res) => {
        const type = req.query.types;
        const data = await CmsModel.find({ type })
        helper.success(res, "Cms Get Succesfully", data);
    }),
    CmsUpdate: helper.TryCatchHanddler(async (req, res) => {
        const type = req.query.types;
        const data = await CmsModel.update({ type }, { new: true });
        helper.success(res, "Cms Update Successfully", data);
    })
}