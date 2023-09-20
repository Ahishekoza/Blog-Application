import jwtToken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const verfiyToken =(req,res,next)=>{
   
    const token = req.headers.authorization.split(' ')[1]
    const secret_key = process.env.SECRET_KEY
    const user = jwtToken.verify(token,secret_key)
    if(user){
        req.user = user
        next();
    }
    else{
        res.status(404).json({
            message:'Invalid token'
        })
    }
}