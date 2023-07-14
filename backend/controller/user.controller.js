const { sendAuthEmail } = require("../lib/sendAuthEmail");
const {
    createUser,
    getSingleUser,
    updateUser,
} = require("../model/user.model");

async function httpCreateUser(req, res, next) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);

        const token = await createToken(
            {
                username: req.body.username,
                email: req.body.email,
            },
            "token-secret"
        );
        res.json({ newUser, token });
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

async function httpAuthenticateEmail(req, res, next) {
    try {
        const { username, email } = req.body;
        const emailSent = sendAuthEmail(username, email);

        if (!emailSent) {
            const error = new Error("Email could not be sent");
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreateUser,
    httpGetSingleUser,
    httpUpdateUser,
    httpAuthenticateEmail,
};
