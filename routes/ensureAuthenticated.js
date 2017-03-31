/**
 * Authentication function
 * Ensures the user is logged in
 * @IOElgohary
 */
module.exports.ensureAuthenticated =
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.json({
                error: "User not Authorized"
            });
        }
    }