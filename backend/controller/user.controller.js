const {
    createUser,
    getSingleUser,
    updateUser,
    authenticateUser,
} = require("../model/user.model");

async function httpCreateUser(req, res, next) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.json(newUser);
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

async function httpAuthenticateUser(req, res, next) {
    try {
        const { username, email } = req.body;
        const user = await authenticateUser(username, email);

        if (!user) {
            const error = new Error("Invalid username or email");
            error.statusCode = 400;
            throw error;
        }
        const token = await createToken(
            {
                username: user.username,
                email: user.email,
            },
            "token-secret"
        );
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreateUser,
    httpGetSingleUser,
    httpUpdateUser,
    httpAuthenticateUser,
};
