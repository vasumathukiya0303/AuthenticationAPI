const router = require('express').Router();
const User = require('./Model/user');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('./verifyToken');

router.post("/register",async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashedPswd = await bcrypt.hash(req.body.pswd,salt);

    const user = new User({
        uname:req.body.uname,
        pswd:hashedPswd
    })

    await user.save();
    res.send(user);

});
router.post('/login',async(req,res)=>{
    
        const user=await User.findOne({uname:req.body.uname});
    if(!user){
        return res.send('User dosent exist...!!');
    }else{
        const isvalid=await bcrypt.compare(req.body.pswd,user.pswd);
        if(!isvalid){
            res.send("password incorrect....!!!");
        }else{
            // res.send("login successfull");
            const token=await jwt.sign({_id:user._id},"privatekey")//_id e key chhe value ma use j store thyo chhe eno date "privatekey" is a key u can write like pranav or something
            res.header('auth-token',token);//key value in header
            res.send(token);
        }
    }
    
   
});
//public route
router.get("/books",(req,res)=>{
    res.json({
       name:"Civil",
       qty:66 
    })
});
//private route using auth
router.get("/bills",auth,(req,res)=>{
    res.json({
       name:"Agri",
       qty:55 
    })
});
module.exports = router;