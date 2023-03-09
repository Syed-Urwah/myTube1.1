import jwt from "jsonwebtoken"
export default function verifyToken(req,res,next){
    // const token = req.cookies.access_token;
    const token = req.header('access_token');
    //if user not login
    if(!token){
        res.send("Your not autuhenticated")
    }else{
        jwt.verify(token, process.env.SECRET_KEY, (err,user)=>{
            if(err){
                next(err)
            }
            req.user = user;
            next()
        })
    }

    

}