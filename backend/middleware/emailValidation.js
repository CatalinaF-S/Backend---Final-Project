// Brauchen wir das?
// async function authenticateToken(req, res, next) {
//     const tokenEmail = req.headers.authorization; //link
//     if (!tokenEmail) {
//         const error = new Error("Invalid token");
//         error.statusCode = 401;
//         return next(error);
//     }

//     try {
//         const decoded = await validateToken(token, "token-secret");
//         req.user = decoded;
//         next();
//     } catch (error) {
//         error.statusCode = 403;
//         return next(error);
//     }
// }
