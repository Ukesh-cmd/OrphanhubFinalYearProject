const { check } = require('express-validator');
exports.childDetails = [
    check("full_name", "Name is required").not().isEmpty(),
    check("gender", "fill the gender").not().isEmpty(),
    check("DOB", "Enter the date of birth")
    .not().isEmpty().withMessage("Date of Birth is required")
    .isDate().withMessage("Invalid date format")
    .isAfter('1990-01-01').withMessage("Date must be after 1990-01-01")
    .toDate(),
    check("enrol_date", "Enter Enrol_date").not().isEmpty(),

]