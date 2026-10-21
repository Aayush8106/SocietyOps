import Note from "../models/Note.js";
import type {Request , Response} from "express";

export async function createNote(req : Request , res : Response){
    const {title , content} = req.body;
    const note = await Note.create({title , content});
    res.status(201).json(note);
}

export async function getNotes(req : Request , res : Response){
    const notes = await Note.find();
    res.json(notes);
}

export async function getNoteById(req : Request , res : Response){
    const {id} = req.params;
    const note = await Note.findById(id);
    if(!note){
        return res.status(404).json({message : "Note Not Found."});
    }
    res.json(note);
}

export async function updateNote(req : Request ,  res : Response){
    const {id} = req.params;
    const {title , content} = req.body;
    const note = await Note.findByIdAndUpdate(id , {title , content} , {new : true});
    if(!note){
        return res.json(404).json({message : "Note Not Found."});
    }
    res.json(note);
} 