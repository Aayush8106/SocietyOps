import Complaint from "../models/Complaint.js";
import type {Request , Response} from "express";

export async function createComplaint(req : Request , res : Response){
    try{
        const {title , description , category , priority} = req.body;
        const complaint = await Complaint.create({title , description , category , priority});
        res.status(201).json(complaint);
    }catch(error){
        res.status(400).json({message : "Failed to Create a Complaint."});
    }
}

export async function getComplaints(req : Request , res : Response){
    const complaints = await Complaint.find().sort({createdAt : -1});
    res.json(complaints);
}

export async function getComplaintById(req : Request , res : Response){
    try{
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint){
           return res.status(404).json({message : "Complaint not found."});
        }
        res.json(complaint);
    }catch{
        res.status(500).json({message : "Failed to Retrieve a Complaint or db Err."});
    }
}

export async function updateComplaint(req : Request , res : Response){
    try {
        const {id} = req.params;
        const {title , description , category , priority} = req.body;
        const complaint = await Complaint.findByIdAndUpdate(id , {title , description , category , priority} , {returnDocument: "after" , runValidators : true}); 
        if(!complaint){
            return res.status(404).json({message : "Complaint not found."});
        }
        res.json(complaint);
    }catch{
        res.status(500).json({message : "Failed to Update a Complaint or db Err."});
    }
}

export async function deleteComplaint(req : Request , res : Response){
    try{
        const {id} = req.params;
        const complaint = await Complaint.findByIdAndDelete(id);
        if(!complaint){
            return res.status(404).json({message : "Complaint not found."});
        }
        res.json({ message: "Complaint deleted." });
    }catch{
        res.status(500).json({message : "Failed to Delete a Complaint or db Err."});
    }
}