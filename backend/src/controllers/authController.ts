import User from "../models/User.js";
import bcrypt from "bcrypt";
import type{Request , Response} from "express";
import jwt from "jsonwebtoken";

export async function login(req : Request , res : Response){
    try{

        const {email , password} = req.body;
        const user = await User.findOne({email :  email.toLowerCase()});
        if(!user){
            return res.status(404).json({ message: "New user" });
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Incorrect Password." });
        }

        const secret  = process.env.JWT_SECRET;
        if(!secret){
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign({id : user.id , role : user.role}, secret , {expiresIn : "1h"});
        res.json({
            message : "Login Successfull",
            token,
            user: { id: user._id, name: user.name, email: user.email, wing: user.wing, flatNumber: user.flatNumber, role: user.role }
        });

    }catch{
        res.status(500).json({ message: "Login failed" });
    }
}