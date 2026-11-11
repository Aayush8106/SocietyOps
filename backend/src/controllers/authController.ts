import User from "../models/User.js";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import type{Request , Response} from "express";
import jwt from "jsonwebtoken";
import Otp from "../models/Otp.js";

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

export async function sendOtp(req : Request , res : Response){
    try{
        const email = req.body.email.toLowerCase();
        const existing = await User.findOne({email});
        if(existing){
            return res.status(409).json({ message: "Email already registered" });
        }

        const otp = randomInt(100000, 1000000);
        const otpHash = await bcrypt.hash(String(otp), 10);

        await Otp.findOneAndUpdate(
            {email},
            {otpHash , attempts : 0 , expiresAt : new Date( Date.now() + 5 * 60 * 1000 )},
            {upsert : true}
        );

        const mailKey = process.env.MAIL_KEY;
        if(!mailKey){
             throw new Error("MAIL_KEY is not defined");
        }

        const response = await fetch('https://otp-sender-reuseable.vercel.app/societyops-otp',{
            method:"POST",
            headers:{
                'x-api-key' : mailKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail : email,
                otp
            })
        }) 

        if(!response.ok){
            throw new Error("Mail Service Failed.");
        }

        res.json({ message: "OTP sent" });

    }catch{
        res.status(500).json({ message: "Failed to send OTP" });
    }
}

export async function register(req : Request , res : Response){
    try{
        const {name, password, wing, flatNumber, otp} = req.body;
        const email = req.body.email.toLowerCase(); 
        const otpDoc = await Otp.findOne({email});

        if(!otpDoc){
            return res.status(400).json({message : 'OTP expired or not requested.'});
        }

        if(otpDoc.expiresAt < new Date()){
            return res.status(400).json({message : 'OTP expired.'});
        }

        if(otpDoc.attempts >= 5){
            await Otp.deleteOne({email});
            return res.status(429).json({message : 'Too many attempts. Request a new OTP.'});
        }

        const isMatch = await bcrypt.compare(String(otp),otpDoc.otpHash);

        if(!isMatch){
            await Otp.updateOne({email} , {$inc : {attempts : 1}});
            return res.status(400).json({message : 'Invalid OTP.'});
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await User.create({name , email , password : hashedPassword , flatNumber , wing});
        await Otp.deleteOne({email});

        const secret = process.env.JWT_SECRET;
        if(!secret){
             throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign({id : user.id , role : user.role} , secret , {expiresIn:'1h'});

        res.status(201).json({
            message : "Register Successfull",
            token,
            user: { id: user._id, name: user.name, email: user.email, wing: user.wing, flatNumber: user.flatNumber, role: user.role }
        });        

    }catch{
        res.status(500).json({ message: "Failed to Register" });
    }
}