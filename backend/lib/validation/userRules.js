const { check } = require("express-validator");

exports.userValidationRules = [
    check("email")
        .escape()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address 😣"),
    check("username")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("User name is required 😣"),
    check("city").escape().trim().notEmpty().withMessage("City is required 😣"),
];
