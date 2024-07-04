/**
 * Middleware function to check if the current user has an "admin" role.
 * If the user is not an admin, it returns a 403 Forbidden response.
 * Otherwise, it calls the next middleware function.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function to be executed.
 */
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};

module.exports = adminMiddleware;
