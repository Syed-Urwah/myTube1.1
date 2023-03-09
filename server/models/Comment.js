import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    videoId:{
        type: String
    },
    desc:{
        type: String
    }
},
{timestamps: true}
);

export default mongoose.model("Comments", commentSchema)