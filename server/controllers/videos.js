import Video from '../models/Video.js'
import User from '../models/User.js'

//add video
export const addVideo = async (req,res,next) =>{
    try {
        const newVideo = new Video({
            userId: req.user.id,
            ...req.body
        })

        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo)
    } catch (error) {
        next(error)
    }
   
}

//update video
export const updateVideo = async (req,res,next) =>{
    try {

        const video = await Video.findById(req.params.id)

        if(video.userId === req.user.id){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set: req.body
            }, {new: true})

            res.status(200).json(updatedVideo)
        }else{
            res.status(400).send("Your only allowed to update your video")
        }
        
    } catch (error) {
        next(error)
    }
}

//delete video
export const deleteVideo = async (req,res,next) =>{
    try {
        let success = false;
        const video = await Video.findById(req.params.id);

        if(video.userId === req.user.id){
            success = true;
            await Video.findByIdAndDelete(req.params.id)
            
            res.status(200).json(success)
        }else{
            res.status(400).send("Your only allowed to delete your video")
        }

        
    } catch (error) {
        next(error)
    }
}

export const videoById = async (req,res,next) =>{
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
    
}

//subscribed channels videos
export const sub = async (req,res,next) =>{
    try {
        const user = await User.findById(req.user.id)
        const subscribedUsers = user.subscribedUsers

        const subList = Promise.all(
            subscribedUsers.map((channelId)=>{
            return Video.find({userId: channelId})
        })) 

        
        res.status(200).json((await subList).flat());
    } catch (error) {
        next(error)
    }    
}

//History videos
export const history = async (req,res,next) =>{

    try {
        const user = await User.findById(req.user.id);
    const history = user.history;

    const historyList = Promise.all(
        history.map((e)=>{
            return Video.findById(e)
        })
    )
    res.status(200).json(await historyList)
    } catch (error) {
        next(error)
    }

    
}

//watch Later videos
export const watchLater = async (req,res,next) =>{

    try {
        const user = await User.findById(req.user.id);
        const watchLater = user.watchLater;

        const watchLaterList = Promise.all(
            watchLater.map((e)=>{
                return Video.findById(e);
        })
    )
        res.status(200).json(await watchLaterList);
    } catch (error) {
        next(error);
    }

    
}

//trend videos
export const trend = async (req,res,next) =>{
    try {
        const videos = await Video.find().sort({views: -1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

//random videos
export const randomVideos = async (req,res,next) =>{
    try {
        const videos = await Video.aggregate([{$sample: {size:40}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

//video by tag
export const byTag = async (req,res,next) =>{

    try {
        //using express qurey
        const tags = req.query.tag.split(",")
        const videByTag = await Video.find({tags: {$in: tags}}).limit(20)
        res.status(200).json(videByTag)
    } catch (error) {
        next(error)
    }

    
}

//video by category
export const byCategory = async (req,res,next) =>{
    try {
        const categroy = req.query.catg
        const video = await Video.find({category: {$in: categroy}}).limit(20);
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
}

export const bySearch = async (req,res,next) =>{
    try {
        const search = req.query.q;
        const videoBySearch = await Video.find({title: {$regex: search, $options: "i"}}).limit(40);

        if(videoBySearch.length === 0){
            res.status(200).send("search by title")
        }else{
            res.status(200).json(videoBySearch)
        }

    } catch (error) {
        next(error)
    }
}

//video views
export const videoViews = async (req,res,next)=>{
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        }, {new: true})

        res.status(200).json(video)
    } catch (error) {
        next(error)
    }

    

}

//get video byUserId
export const videoByUserId = async (req,res,next) =>{
    try {
        const video = await Video.find({userId: req.params.userId})
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }

}
