const addMessageToDB = require("../controllers/messagesController").addMessageToDB;
const messagesController = require("../controllers/messagesController").getAllMessageFromDB;
const router = require("express").Router();


router.post("/addmsg/", addMessageToDB); 
router.post("/getmsg/" , messagesController);  

module.exports = router; //exported to index.js of server 