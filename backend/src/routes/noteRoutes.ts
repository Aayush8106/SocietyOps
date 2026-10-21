import { createNote , getNotes , getNoteById , updateNote , deleteNote} from "../controllers/noteController.js";
import { Router } from "express";

const router = Router();

router.post("/create" , createNote);
router.get("/retrieve" , getNotes);
router.get("/retrieve/:id" , getNoteById);
router.put("/update/:id" , updateNote);
router.delete("/delete/:id" , deleteNote);

export default router;