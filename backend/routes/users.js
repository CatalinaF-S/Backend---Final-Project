const express = require("express");
const { httpCreateUser } = require("../controller/user.controller");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

//POST - signup
router.post("/signup", httpCreateUser);
module.exports = router;
