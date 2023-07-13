const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        city: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = { userSchema };
