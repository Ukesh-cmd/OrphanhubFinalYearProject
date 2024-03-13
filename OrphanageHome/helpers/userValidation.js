const { check } = require('express-validator')

exports.userSignUpValidation = [
    check("name", " Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    // check("phone_number", "Phone Number is required").not().isEmpty(),
    check("address", "address is required").not().isEmpty(),
    check("password", "Enter password").isLength({ min: 5, max: 10 }),

]

exports.userLogInValidation = [

    check("email", "Email is required").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check("password", "Enter password").isLength({ min: 5, max: 10 }),

]


exports.forgetValidation = [

    check("email", "Enter a valid mail").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    
]