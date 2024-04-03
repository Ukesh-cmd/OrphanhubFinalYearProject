const { check } = require('express-validator');
exports.staffDetails = [
    check("fullName", "Name is required").not().isEmpty(),
    check("gender", "fill the gender").not().isEmpty(),
    check("phoneNumber", "Phone Number is required").not().isEmpty(),
    check("DOB", "Enter the date of birth").not().isEmpty().isDate().toDate()
    .isAfter('1900-01-01').withMessage("Date must be after 1900-01-01")
    .withMessage("Date must be in the format YYYY-MM-DD"),
    check("joinDate", "Enter Enrol_date").not().isEmpty(),

]