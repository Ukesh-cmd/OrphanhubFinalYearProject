const {check } = require('express-validator');
exports.donorValidation = [
    check("fullName", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid mail").isEmail().normalizeEmail({ gmail_remove_dots:true}),
    //check("name", "Name is required").not().isEmpty(),
]