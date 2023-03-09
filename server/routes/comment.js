import express from 'express'
import { addComment, byVideo, deleteComment, updateComment } from '../controllers/comments.js';
import verifyToken from '../verifyToken.js'

const router = express.Router();

//add comment
router.post('/add/:videoId', verifyToken, addComment )

//update comment
router.put('/update/:id', verifyToken, updateComment )

//delete comment
router.delete('/delete/:id', verifyToken, deleteComment)

//get comment by video
router.get('/:videoId', byVideo)

export default router