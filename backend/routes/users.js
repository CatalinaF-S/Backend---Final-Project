const express = require("express");
const {
    httpCreateUser,
    httpGetSingleUser,
    httpUpdateUser,
    httpAuthenticateEmail,
    httpConfirmEmail,
} = require("../controller/user.controller");
const { validationInputs } = require("../middleware/validation");
const { userValidationRules } = require("../lib/validation/userRules");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

//POST - signup
router.post(
    "/signup",
    validationInputs(userValidationRules),
    httpCreateUser,
    httpAuthenticateEmail
);

//GET - verifizierung
router.get("/signup/:token", httpConfirmEmail);

//GETSingle User,PUT - update user
router.route("/:id").get(httpGetSingleUser).put(httpUpdateUser);

module.exports = router;
