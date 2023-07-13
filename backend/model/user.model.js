const mongoose = require("mongoose");
const { userSchema } = require("./user.schema");

const User = mongoose.model("User", userSchema);

async function createUser(userData) {
    return await User.create(userData);
}
async function getSingleUser(id) {
    const user = await userNotFound(User, id);
    return user;
}
async function updateUser(id, bodyData) {
    await userNotFound(User, id);
    return await User.findOneAndUpdate({ _id: id }, bodyData, { new: true });
}

module.exports = { createUser, getSingleUser, updateUser };
