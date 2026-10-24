import bcrypt from "bcrypt";

async function demo(){
    const password = "Aayush12123";
    const hash = await bcrypt.hash(password , 10);

    console.log("Password:", password);
    console.log("Hash:", hash);

    const isMatch = await bcrypt.compare(password , hash);
    console.log("Match: ",isMatch);

    const isWrong = await bcrypt.compare("wrongpassword", hash);
    console.log("Wrong password: ", isWrong);
}

demo();