const {check } = require('express-validator');

exports.signUpValidation = [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid mail").isEmail().normalizeEmail({ gmail_remove_dots:true}),
    check("password", "password is required").isLength({min:5, max:10}),
    check("address", "Enter address").not().isEmpty(),
    //check("name", "Name is required").not().isEmpty(),
]

exports.logInValidation = [
    
    check("email", "Please enter valid mail").isEmail().normalizeEmail({ gmail_remove_dots:true}),
    check("password", "password is required").isLength({min:5, max:10}),
]