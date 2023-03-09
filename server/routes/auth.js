import express from 'express';
import { googleAuth, login, signup } from '../controllers/auths.js';
const router = express.Router();

//signup
router.post("/signup", signup)

//login
router.post("/login", login)

//Google Auth
router.post('/google', googleAuth)

export default router