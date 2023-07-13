const express = require("express");
const { httpCreateUser } = require("../controller/user.controller");
const { validationInputs } = require("../middleware/validation");
const { userValidationRules } = require("../lib/validation/userRules");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

//POST - signup
router.post("/signup", validationInputs(userValidationRules), httpCreateUser);
module.exports = router;
