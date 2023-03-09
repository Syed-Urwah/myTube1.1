import express from 'express';
import { addHistory, deleterUser, dislikeVideo, getUser, likeVideo, subscribeUser, unSubscribeUser, updateUser, watchLater } from '../controllers/users.js';
import verifyToken from '../verifyToken.js';
const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser)

//delete user
router.delete("/:id", verifyToken, deleterUser)

//getUser
router.get("/find/:id", getUser )

//subscribeUser
router.put("/sub/:id", verifyToken, subscribeUser)

//unsubscribeUser
router.put("/unsub/:id", verifyToken, unSubscribeUser)

//likeVideo
router.put('/like/:videoId', verifyToken, likeVideo )

//unLikeVideo
router.put('/unlike/:videoId', verifyToken, dislikeVideo )

//watchLater
router.put('/watch-later/:videoId', verifyToken, watchLater)

//add video to history of user
router.put('/history/:videoId', verifyToken, addHistory)

export default router