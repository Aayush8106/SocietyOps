import { createNote , getNotes , getNoteById } from "../controllers/noteController.js";
import { Router } from "express";

const router = Router();

router.post("/create" , createNote);
router.get("/retrieve" , getNotes);
router.get("/retrieve/:id" , getNoteById);

export default router;