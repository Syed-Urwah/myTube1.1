import mongoose from "mongoose";
import unique from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
    },
    subscribers:{
        type: Number,
        default: 0
    },
    subscribedUsers:{
        type: [String]
    },
    watchLater:{
        type: [String]
    },
    fromGoogle:{
        type: Boolean,
        default: false
    },
    img:{
        type: String,
        default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
    },
    history:{
        type: [String]
    }
},
{timestamps: true}
)

userSchema.plugin(unique, { type: 'mongoose-unique-validator' })

export default mongoose.model("User", userSchema)
const Foo = mongoose.model('User', userSchema);
// Foo.reIndex();