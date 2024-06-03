const register = require("../controllers/usersController").register;
const login = require("../controllers/usersController").login;
const router = require("express").Router();

router.post("/register" , register);
router.post("/login", login);

module.exports = router;