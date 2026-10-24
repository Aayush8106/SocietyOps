import jwt  from "jsonwebtoken";

const secret = "demo-secret-123";
const token = jwt.sign({id : "123" , role : "resident"},secret,{expiresIn : "1h"});

const decoded = jwt.verify(token , secret);

try {
    jwt.verify(token, "wrong-secret");
} catch (error) {
    console.log("Rejected: invalid token");
}

console.log("Token: ",token);
console.log("Decoded: ",decoded);