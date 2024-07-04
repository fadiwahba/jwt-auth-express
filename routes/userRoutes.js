const express = require("express");
/**
 * Exports various user-related controller functions for handling user registration, login, profile retrieval, and profile updates.
 * 
 * @module controllers/userController
 * @exports {function} registerUser - Handles user registration.
 * @exports {function} loginUser - Handles user login.
 * @exports {function} getUserProfile - Retrieves the current user's profile.
 * @exports {function} updateUserProfile - Updates the current user's profile.
 * @exports {function} updateUser - Updates a user's information (admin-only).
 * @exports {function} deleteUser - Deletes a user (admin-only).
 */
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

// Admin routes
router.put("/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
