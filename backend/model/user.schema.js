const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        city: { type: String, required: true },
        checkboxValueTopic1: { type: String },
        checkboxValueTopic2: { type: String },
        checkboxValueTopic3: { type: String },
        status: { type: String, default: "pending" }, // Achtung!
    },
    { timestamps: true }
    //Achtung link muss expired!
);

module.exports = { userSchema };
