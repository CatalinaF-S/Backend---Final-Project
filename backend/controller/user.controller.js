const { sendAuthEmail } = require("../lib/sendAuthEmail");
const {
    createUser,
    getSingleUser,
    updateUser,
    setStatusConfirm,
} = require("../model/user.model");
const { createToken } = require("../lib/token");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

async function httpCreateUser(req, res, next) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        const tokenSecret = process.env.TOKEN_SECRET;

        const token = await createToken(
            {
                username: req.body.username,
                email: req.body.email,
            },
            tokenSecret
        );
        // console.log(token);
        // res.json({ newUser, token }); route abbrechen
        next(token);
    } catch (error) {
        next(error);
    }
}
async function httpGetSingleUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await getSingleUser(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}
async function httpUpdateUser(req, res, next) {
    try {
        const { id } = req.params;
        const updatedUser = await updateUser(id, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function httpAuthenticateEmail(token, req, res, next) {
    try {
        const link = `http://localhost:3000/users/signup/${token}`;
        // console.log("link: ", link);
        const { username, email } = req.body;
        const emailSent = await sendAuthEmail(username, token);
        // console.log("controller");
        if (!emailSent) {
            const error = new Error("Email could not be sent");
            error.statusCode = 400;
            throw error;
        }
        res.json({ link });
    } catch (error) {
        next(error);
    }
}

const verify = promisify(jwt.verify);

// async function decodeToken(tokenEmail, secret) {
//     const token = await verify(payload, secret);
//     return token;
// }

async function httpConfirmEmail(req, res, next) {
    try {
        const { token } = req.params;
        const decoded = await verify(token, "token-secret"); //Achtung .env
        // console.log("token decoded: ", decoded);
        const confirmation = await setStatusConfirm(decoded.email);
        // console.log(confirmation);
        res.json({ message: "Email was confirmed! 😎" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreateUser,
    httpGetSingleUser,
    httpUpdateUser,
    httpAuthenticateEmail,
    httpConfirmEmail,
};
