const express = require("express");

const router = express.Router();
const { signUpValidation, logInValidation } = require('../helpers/adminValidation')
const adminController = require("../controller/adminController");

router.post('/admin/register', signUpValidation, adminController.register);
router.post('/admin/login', logInValidation, adminController.logIn);
module.exports = router;