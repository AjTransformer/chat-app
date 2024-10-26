const messageModel = require("../model/messageModel");

module.exports.addMessageToDB = async (req,res,next)=>{
    try{
        const {from , to,  message} = req.body;
        const data = await messageModel.create({
            message:{text : message},
            users: [from , to],
            sender : from,
        });
        if(data){
            return res.json({msg : "Message added successfully"});
        }else{
            return res.json({msg:"Failed to add message to database"});
        }
    }catch(ex){
        next(ex);
    }
}

// module.exports.getAllMessageFromDB = async(req,res,next)=>{
//     try{
//         const {from, to } = req.body;
//         // console.log("from ",from);
//         // console.log("to ",to);
//         const messages = await messageModel.find({
//             // users: {
//             //     $all : [from , to],
//             // },
//             // $and: [
//             //     { "users.0._id": from },
//             //     { "users.1": to }
//             //   ]
//             // users: {
//             //     $elemMatch: { _id: from },
//             //     $elemMatch: { _id: to }
//             //   }
//             $and: [
//                 { $or: [{ "users._id": from }, { "users": to }] },
//                 { $or: [{ "users._id": to }, { "users": from }] }
//               ]
//         }).sort({updatedAt :1});
//         // console.log("Message for getallMsg ",messages);
//         const projectedMessages = messages.map((msg)=>{
//             return {
//                 fromSelf : msg.sender.toString() === from, //A boolean indicating whether the sender of the message is the same as the from user.
//                 message : msg.message.text,
//             };
//         });
//         res.json(projectedMessages);
//     }catch(ex){
//         next(ex)
//     }
// }

module.exports.getAllMessageFromDB = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await messageModel.find({
        $and: [
          { $or: [{ "users._id": from }, { "users": from }] },
          { $or: [{ "users._id": to }, { "users": to }] }
        ]
      }).sort({ updatedAt: 1 });
      
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };