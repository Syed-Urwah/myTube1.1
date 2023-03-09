import Comment from '../models/Comment.js'
import Video from '../models/Video.js'

//add a comment
export const addComment = async (req,res,next) =>{

    try {
        const newComment = new Comment({
            userId: req.user.id,
            videoId: req.params.videoId,
            desc: req.body.desc
        })
        let saveComment = newComment.save()
        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }

    
}

//update a comment
export const updateComment = async (req,res,next) =>{

    try {
        const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
            $set: {desc: req.body.desc}
        },{new: true});
        res.status(200).json(updateComment)
    } catch (error) {
        next(error)
    }

    
}

//delete a comment
export const deleteComment = async (req,res,next) =>{

    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId)

        if(comment.userId === req.user.id || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).send("Comment deleted successfully")
        }else{
            res.status(400).send("you can delete only your comments")
        }

        
    } catch (error) {
        next(error)
    }

    
}

//get comment by videoId
export const byVideo = async (req,res,next) =>{

    try {
        const comment = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }


}