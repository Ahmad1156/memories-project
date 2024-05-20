import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin=async(req,res)=>{
    const {email,password} = req.body;

    try {
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(200).json({error:"User doesnt exist ."})
        }
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(200).json({error:"Invalid credentials."})
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},process.env.jwt_Secret,{expiresIn:"1h"});
        res.status(200).json({result:existingUser,token});
    } catch (error) {
        console.log(error);
    }
}

export const signup=async(req,res)=>{
      const {email,password,confirmPassword,firstName,lastName}=req.body;
      try {
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(200).json({error:"User already exists."});
        }
        if(password !== confirmPassword) return res.status(400).json({error:"Passwords dont match!!"});

        const hashedPassword=await bcrypt.hash(password,12);
        const result=await User.create({email:email,password:hashedPassword,name:`${firstName} ${lastName}`});

        const token=jwt.sign({email:result.email,id:result._id},process.env.jwt_Secret,{expires:'1h'});

         res.status(200).json({result,token});
      } catch (error) {
        res.status(500).json({message:"Something went wrong."});
      }
}