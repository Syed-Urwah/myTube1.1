import User from '../models/User.js'
import Video from '../models/Video.js';

//updating user
export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                });
            const { password, ...others } = updatedUser._doc //removing password from updatedUser
            res.status(200).json(others);
        } catch (error) {
            next(error)
        }
    } else {
        res.status(400).json("Your not the owner of this account")
    }
}

//deleting user
export const deleterUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {

            await User.findByIdAndDelete(req.params.id);
            res.status(200).send("User has been deleted successfully")

        } catch (error) {
            next(error)
        }


    } else {
        res.status(400).send("Your not allowed to deleted others accounts")
    }
}

//getUser
export const getUser = async(req,res,next) =>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
   
}

//subscribing user
export const subscribeUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            $push: {subscribedUsers : req.params.id}
        },{
            new: true
        });

    
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: 1}
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }

   

}

//unsubscribing user
export const unSubscribeUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers: req.params.id}
        },{
            new: true
        })

        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: -1}
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//like video
export const likeVideo = async (req, res, next) => {


    try {
            const LikedVideo = await Video.findById(req.params.videoId);
            let userLikes = 0;
            
            LikedVideo.likes.map((e)=>{
                if(e === req.user.id){
                    userLikes++;
                }
            })

            if(userLikes===0){
                const video = await Video.findByIdAndUpdate(req.params.videoId, {
                    $push: {likes: req.user.id},
                    $pull: {dislikes: req.user.id}
                },{new: true})
                res.status(200).json(video);
            }else{
                const video = await Video.findByIdAndUpdate(req.params.videoId,{
                    $pull: {likes: req.user.id}
                },{new: true})
                res.status(200).json(video)
            }

            
     
            
       
    } catch (error) {
        next(error)
    }
}

//unlike video
export const dislikeVideo = async (req, res, next) => {
    try {

        const DikedVideo = await Video.findById(req.params.videoId);
            let userDislikes = 0;
            
            DikedVideo.dislikes.map((e)=>{
                if(e === req.user.id){
                    userDislikes++;
                }
            })

        if(userDislikes === 0){
            const video = await Video.findByIdAndUpdate(req.params.videoId, {
                $push: {dislikes: req.user.id},
                $pull: {likes: req.user.id}
            }, {new: true})
            res.status(200).json(video);
        }else{
            const video = await Video.findByIdAndUpdate(req.params.videoId,{
                $pull: {dislikes: req.user.id}
            },{new: true})
            res.status(200).json(video)
        }
        
    } catch (error) {
        next(error)
    }
}

//watchLater
export const watchLater = async (req,res,next) =>{

    try {
        const user1 = await User.findById(req.user.id);
    let watch = false;

    user1.watchLater.map((e)=>{
        if(e === req.params.videoId){
            watch = true
        }
    })
    if(!watch){
        const user = await User.findByIdAndUpdate(req.user.id, {
        $push: {watchLater: req.params.videoId}
    },{new: true})
    res.status(200).json(user)

    }else{
        const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {watchLater: req.params.videoId}
    },{new: true})
    res.status(200).json(user)
    }
    } catch (error) {
        next(error)
    }

    

    
}

//add videoId in the history array of user
export const addHistory = async (req,res,next) =>{
    const user = await User.findById(req.user.id);
        const user1 = await User.findByIdAndUpdate(req.user.id,{
            // $pull: {history: req.params.videoId},
            $addToSet: {history: req.params.videoId}
        }, {new: true});
        res.status(200).json(user1)
    
}

