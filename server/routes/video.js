import express from 'express'
import { addVideo, byCategory, bySearch, byTag, deleteVideo, history, randomVideos, sub, trend, updateVideo, videoById, videoByUserId, videoViews, watchLater } from '../controllers/videos.js';
import verifyToken from '../verifyToken.js';

const router = express.Router();

//addvideo
router.post('/addVideo', verifyToken, addVideo)

//updateVideo
router.put('/update/:id', verifyToken, updateVideo)

//deleteVideo
router.delete('/delete/:id', verifyToken, deleteVideo)

//getVideoById
router.get('/fetchVideo/:id', videoById)

//get subscribedVideo
router.get('/sub', verifyToken, sub)

//get history
router.get('/history', verifyToken, history)

//get watchLater
router.get('/watch-later', verifyToken, watchLater)

//get trendVideos
router.get('/trend', trend)

//get randomVideos
router.get('/random', randomVideos)

//get trendVideo
router.put('/views/:id', videoViews)

//get byTag
router.get('/tags', byTag)

//get byCategory
router.get('/category', byCategory)

//get bySearch
router.get('/search', bySearch)

//get video of a specific user
router.get('/userVideo/:userId', videoByUserId)

export default router