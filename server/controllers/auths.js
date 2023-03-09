import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signup(req, res,next) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }

}

export async function login(req,res,next){
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            res.status(400).send("User not found")
        }else{
            const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            res.status(400).json("Incorrect credentials")
        }

        //removing password property
        const {password, ...others} = user._doc; //others includes all the property except password
        
        //using jwt when user login
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        //storing jwt token as a cookie 
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({user, token})
        }
        
    } catch (error) {
        next(error)
    }
   


}

export const googleAuth = async (req,res,next) =>{

    try {
        const user = await User.findOne({email: req.body.email})
    //Login with google
    if(user){
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200).json({user, token})
    }
    //SignUp with google
    else{
        const newUser = new User({
            ...req.body,
            fromGoogle: true
        });
        const saveUser = await newUser.save();
        const user = saveUser
        const token = jwt.sign({id: saveUser._id},process.env.SECRET_KEY);
        res.cookie("access_token", token , {
            httpOnly: true
        }).status(200).json({user, token});
    }

    } catch (error) {
        next(error)
    }

    }