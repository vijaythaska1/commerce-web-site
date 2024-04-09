import mongoose from "mongoose"

const CmsSchema = mongoose.Schema({
    type: {
        type: String,
        require,
    },
    tittel: {
        trye: String,
        require,
    },
    content: {
        type: String,
        require,
    },

}, { timeStamp: true })

export default mongoose.mode("Cms", CmsSchema)