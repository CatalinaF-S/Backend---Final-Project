const {
    createUser,
    getSingleUser,
    updateUser,
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

module.exports = { httpCreateUser, httpGetSingleUser, httpUpdateUser };
