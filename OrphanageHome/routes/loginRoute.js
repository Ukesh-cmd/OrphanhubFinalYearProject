const express = require("express")
const router = express.Router();
const {logInValidation } = require('../helpers/adminValidation')
const {userLogInValidation, forgetValidation } = require("../helpers/userValidation")
const logInController = require("../controller/logInController")

router.post('/login', userLogInValidation, logInValidation, logInController.login);


module.exports = router;