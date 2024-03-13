const express = require("express")
const router = express.Router();

const userController = require("../controller/userController")
const { userSignUpValidation, userLogInValidation, forgetValidation } = require("../helpers/userValidation")
const { isAuthorize } = require("../middleware/auth");
router.post('/user/register', userSignUpValidation, userController.userRegister);
router.post('/user/login', userLogInValidation, userController.userLogIn);

router.get('/user/get-user', isAuthorize, userController.getUser);
router.get('/user/get', userController.showUser);
//router.post('user/forget-password', forgetValidation, userController.forgetPassword);
router.post('/user/forgetPassword', forgetValidation, userController.forgetPassword);
router.post('/user/logout', userController.userLogout);

router.get('/user/count', userController.countUser);
module.exports = router;