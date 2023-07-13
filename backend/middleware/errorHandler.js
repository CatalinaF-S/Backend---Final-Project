
async function locateUser(Model, id) {
  
    const user = await Model.findById(id );
    if (!user) {
        const error = new Error("Benutzer nicht gefunden");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        messages: err.message,
    });
}

module.exports = { errorHandler, locateUser };