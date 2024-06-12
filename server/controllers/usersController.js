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
        if(!user)
            return res.json({msg:"Invalid UserName Or Passwrod" , status:false})
        const userPassword = await bcrypt.compare(password ,user.password );
        if(!userPassword)
            return res.json({msg:"Invalid UserName Or Password ", status:false});
        delete user.password;
        return res.json({status:true , user});
    }catch(ex){
        next(ex);
    }
}


// The function then uses the User.findByIdAndUpdate() method to find a user by ID (userId) and update their data. It updates two fields: isAvatarImageSet and avatarImage. It sets isAvatarImageSet to true and assigns the provided avatarImage to the user's data. 
// The option { new: true } ensures that the function returns the updated user data.
module.exports.setAvatars = async(req,res,next) =>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet:true,
                avatarImage,
            },{
                new:true
            }
        );
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        });
    }catch(ex){
        next(ex)
    }
}

module.exports.getAllUsers = async(req,res,next)=>{
    const userId = req.params.id;
    try{
        const users = await User.find({
            _id: {$ne : userId}
        }).select([
            "email",
            "avatarImage",
            "username",
            "_id"
        ])
        res.json(users);
    }catch(ex){
        next(ex);
    }
}