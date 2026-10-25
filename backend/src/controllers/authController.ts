import User from "../models/User.js";
import bcrypt from "bcrypt";
import type{Request , Response} from "express";

export async function register(req : Request , res : Response){
    try{

        let {name , email , password , flatNumber , wing} = req.body;
        email = email.toLowerCase();
        const existing = await User.findOne({email});
        if(existing){
           return res.status(409).json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.create({
            name , email , password : hashedPassword , flatNumber , wing
        });

        res.status(201).json({
            message: "Registered successfully",
            user: { id: user._id, name: user.name, email: user.email, wing: user.wing, flatNumber: user.flatNumber, role: user.role }
        });
        
    }catch{
        res.status(500).json({ message: "Registration failed" });
    }
}