import { Router } from "express";
import { createComplaint , getComplaints , getComplaintById , updateComplaint , deleteComplaint } from "../controllers/complaintController.js";

const router = Router();

router.post("/create" , createComplaint);
router.get("/retrieve" , getComplaints);
router.get("/retrieve/:id" , getComplaintById);
router.put("/update/:id" , updateComplaint);
router.delete("/delete/:id" , deleteComplaint);

export default router;