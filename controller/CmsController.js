import helper from "../utility/helper";
import Model from "../Model/index.js"

export default {
    CMSGet: helper.TryCatchHanddler(async (req, res) => {
        const type = req.query.types;
        const data = await Model.CmsModel.find({ type })
        helper.success(res, "Cms Get Succesfully", data);
    }),
    CmsUpdate: helper.TryCatchHanddler(async (req, res) => {
        const type = req.query.types;
        const data = await Model.CmsModel.update({ type }, { new: true });
        helper.success(res, "Cms Update Successfully", data);
    }),
}