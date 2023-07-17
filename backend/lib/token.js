const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const sign = promisify(jwt.sign);

const createToken = async (payload, secret) => {
    const token = await sign(payload, secret);
    return token;
};

module.exports = { createToken };
