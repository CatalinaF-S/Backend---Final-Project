const mongoose = require("mongoose");
const { userSchema } = require("./user.schema");
const { locateUser } = require("../middleware/errorHandler");

const User = mongoose.model("User", userSchema);

async function createUser(userData) {
    return await User.create(userData);
}
async function getSingleUser(id) {
    const user = await locateUser(User, id);
    return user;
}
async function updateUser(id, bodyData) {
    await locateUser(User, id);
    return await User.findOneAndUpdate({ _id: id }, bodyData, { new: true });
}

async function authenticateUser(username, email) {
    const user = await User.findOne({ email });

    if (!user) {
        return null;
    }

    return user;
}

module.exports = { createUser, getSingleUser, updateUser, authenticateUser };
