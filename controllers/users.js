import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req,res)=>{
    try{    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user) return res.status(404).json({
        success:false,
        message:"user already exist"
    })

    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({
         name ,
         email ,
         password:hashedPassword,
    });

    sendCookie(user,"registered successfully",201,res);}
    catch(err){
        next(err);
    }

     
  
 }

export const login = async (req,res,next) =>{ 
    try{    const { email , password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({
            success:false,
            message:"wrong password or email",
        })
    }

    const isMatched = await bcrypt.compare(password,user.password);

    if(!isMatched){
        return res.status(404).json({
            success:false,
            message:"wrong password or email",
        })
    }

    sendCookie(user,`welcome back, ${user.name}`,201,res);}
    catch(err){
        next(err);
    }

}
//for admin dashboard 
// export const getAllUser = async (req,res)=>{ }

export const getMyProfile= (req,res)=>{

    res.status(200).json({
        success:true,
        user:req.user,
    })
}

export const logout = (req,res) => {
    
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message:"logout successfull",
    })
}


