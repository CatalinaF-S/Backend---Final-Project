const mongoose = require("mongoose");
const { userSchema } = require("./user.schema");

const User = mongoose.model("User", userSchema);

async function createUser(userData) {
    return await User.create(userData);
}

module.exports = { createUser };
