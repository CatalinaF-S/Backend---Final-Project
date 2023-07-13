const { validationResult } = require("express-validator");
const createError = require("http-errors");

exports.validationInputs = (input) => {
    return [
        ...input,
        function (req, res, next) {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return next();
            }
            const extractedErrors = errors.array().map((err) => {
                const err = createError(422, extractedErrors.join(", "));
                return next(err);
            });
        },
    ];
};