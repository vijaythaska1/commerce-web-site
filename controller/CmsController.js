import Model from "../Model/index";
import helper from "../utility/helper";

export default {
  CmsGet: helper.AsyncHanddle(async (req, res) => {
    const type = req.quary.type;
    const data = await Model.CmsModel.findOne({ type });
    helper.success(res, "Cms Get Successfully", data)
  }),

  CmsUpdate: helper.AsyncHanddle(async (req, res) => {
    const { content } = req.body;
    const type = req.quary.type;
    const data = await Model.CmsModel.updateOne({ type }, { content }, { new: true });
    helper.success(res, "CmsUpate Successfully", data);
  })
}
