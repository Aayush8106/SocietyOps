import { Schema , model } from "mongoose";

const otpSchema = new Schema({
        "email"     : {type : String , required : true , "lowercase" : true},
        "otpHash"   : {type : String , required : true},
        "attempts"  : {type : Number , default : 0},
        "expiresAt" : {type : Date , required : true}
});

otpSchema.index({expiresAt : 1} , {expireAfterSeconds : 0});

const Otp = model("otp" , otpSchema);

export default Otp;