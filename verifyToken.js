const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token){
        res.send("No token found in the header");
    }
    else{
        try{
            jwt.verify(token,"privatekey");
            next();
        }catch(error){
            res.send("invalid Token !!!");
        }
    }
}