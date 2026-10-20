import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT : number = Number(process.env.PORT) || 3000;

const server = createServer(app);

async function startServer(){
    try{        

        await connectDB();

        server.listen(PORT , ()=>{
        console.log(`Server live at Port: ${PORT}`);
        });

    }catch(error){
      console.error("Failed to start server:", error);
      process.exit(1);
    }
}

startServer();