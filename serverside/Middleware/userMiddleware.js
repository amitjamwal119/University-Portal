const jwt = require("jsonwebtoken");
//Compares and verifies token 
//Checks for JWT token in Authorization header.
//Decodes the token to get the user ID.

const authmiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; 
    if(!authHeader || !authHeader.startsWith("Bearer ")){ 
        return res.status(401).json({message : "access denied. No token provided." });

    }

    const token = authHeader.split(" ")[1];

    try{
        jwt.verify(token, 'secretcode' , (err,user) => {
            if(err) return res.status(403).json ({error : "invalid token"})
                
                //Request sent from user
                req.user = user;
                next();
        })
    }
    catch (error){
        return res.status(403).json({ error: "Invalid token" });
    }
    
};

module.exports = { authmiddleware };