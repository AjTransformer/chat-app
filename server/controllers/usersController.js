const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req , res , next )=>{
    try{
        console.log(req.body);
        const {username , email , password} = req.body;
        const userCheck = await User.findOne({ username });
        if(userCheck)
            return res.json({msg: "Username Already Used!" , status : false })
        const emailCheck = await User.findOne({ email });
        if(emailCheck)
            return res.json({msg:"Email Already Used " , status:false});
        const hashPassword  = await bcrypt.hash(password , 10)
        const userCreation = await User.create({
            username,
            email,
            password:hashPassword
        });
        delete userCreation.password;
        return res.json({status:true , userCreation});
    }catch(ex){
        console.log(ex);
        next(ex);
    }
}

module.exports.login = async (req,res,next) =>{
    try{
        const{username, password} = req.body;
        const user = await User.findOne({ username });
        console.log("login handle ",req.body);
    }catch(ex){
        next(ex);
    }
}