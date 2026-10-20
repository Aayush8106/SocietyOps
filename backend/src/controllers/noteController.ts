import Note from "../models/Note.js";
import type {Request , Response} from "express";

export async function createNote(req : Request , res : Response){
    const {title , content} = req.body;
    const note = await Note.create({title , content});
    res.status(201).json(note);
}