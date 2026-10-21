import { Schema , model } from "mongoose";

const complaintSchema = new Schema({
    "title"       : {type : String , required : true},
    "description" : {type : String , required : true},
    "category"    : {type : String , required : true , enum : ["Plumbing", "Electrical", "Lift", "Cleaning", "Security", "Other"]},
    "priority"    : {type : String , enum : ["Low" , "Medium" , "High"] , default : "Medium"},
    "status"      : {type : String , enum : ["Sent" , "Assigned" , "In Progress" , "Resolved"] , default : "Sent"}
},{
    timestamps : true
});

const Complaint = model("Complaint" , complaintSchema);

export default Complaint;