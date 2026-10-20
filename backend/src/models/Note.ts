import { Schema , model } from "mongoose";

const noteSchema = new Schema({
    "title"   : String,
    "content" : String,
});

const Note = model("Note" , noteSchema);

export default Note;