import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    title:{
        type: String
    },
    desc:{
        type: String
    },
    imgUrl:{
        type: String
    },
    videoUrl:{
        type: String
    },
    views:{
        type: Number,
        default: 0
    },
    category:{
        type: String,
        required: true
    },
    tags:{
        type: [String]
    },
    likes:{
        type: [String]
    },
    dislikes:{
        type: [String]
    }
},
{timestamps: true}
)

export default mongoose.model("Videos", videoSchema)