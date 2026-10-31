import { randomInt } from "crypto";
import bcrypt from "bcrypt";

async function demo(){
    const otp = randomInt(100000,1000000);
    const hashedOtp = await bcrypt.hash(String(otp),10);

    const ok = await bcrypt.compare(String(otp) , hashedOtp);
    const bad= await bcrypt.compare("999888",hashedOtp);

    console.log("Right code:", ok);
    console.log("Wrong code:", bad);
    console.log("Hashed Otp: "+hashedOtp);

}

demo();