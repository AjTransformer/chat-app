const register = require("../controllers/usersController").register;
const login = require("../controllers/usersController").login;
const setAvatar = require("../controllers/usersController").setAvatars;
const router = require("express").Router();

router.post("/register" , register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar); //http://localhost:5000/api/auth/setAvatar/665df0e07b4e135f715ce631

module.exports = router; //exported to index.js of server 