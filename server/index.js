import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import videoRoute from './routes/video.js'
import commentRoute from './routes/comment.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';

const __dirname = path.resolve();


const dotenvConfig = dotenv.config();

const app = express()

//connecting to mongo
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_STRING, ()=>{
    console.log("connected to mongoDb")
})

//middle-wares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/video', videoRoute)
app.use('/api/comment', commentRoute)

//error handling
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "error found";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

//to connect backend with the frontend build version
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});



app.listen("8000",()=>{
    console.log("Server run")
})