import mongoose from "mongoose";

export async function connectDB(){
    const dbURL : string | undefined  = process.env.MONGO_URL;

    if(!dbURL){
        throw new Error("DB URL Missing.");
    }
        await mongoose.connect(dbURL);
        console.log("DB Connected Successfully.");
    
}