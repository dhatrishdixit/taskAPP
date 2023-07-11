import { User } from "../models/users.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req,res,next) =>{
    const { token } = req.cookies;

    if(!token){
        return res.status(404).json({
            success:false,
            message:"Login First",
        })
    }

    // console.log(token);
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // req object is used to transfer data between different middlewares , yani us , route mein jitne bhi functions hai sab mein transfer karne ke kam ayega 

    req.user = await User.findById(decoded._id);

    next();
}