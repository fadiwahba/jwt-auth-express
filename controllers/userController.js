const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Registers a new user in the system.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing user data.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs in a user and returns a JWT token.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing user credentials.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves with a JWT token when the user is logged in.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("User found:", user);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves the profile of the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.id - The ID of the authenticated user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves with the user profile, excluding the password.
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates the profile of the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the updated user information.
 * @param {string} [req.body.name] - The new name of the user.
 * @param {string} [req.body.email] - The new email address of the user.
 * @param {string} [req.body.password] - The new password of the user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves with a success message when the user profile is updated.
 */
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    res.json({ message: "Profile updated successfully", email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates the profile of the specified user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the updated user information.
 * @param {string} [req.body.name] - The new name of the user.
 * @param {string} [req.body.email] - The new email address of the user.
 * @param {string} [req.body.role] - The new role of the user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves with a success message when the user profile is updated.
 */
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (role) {
      user.role = role;
    }
    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes the specified user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the user to be deleted.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves with a success message when the user is deleted.
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Exports an object containing various user-related functions, including:
 * - `registerUser`: Registers a new user
 * - `loginUser`: Logs in an existing user
 * - `getUserProfile`: Retrieves the profile of the currently logged-in user
 * - `updateUserProfile`: Updates the profile of the currently logged-in user
 * - `updateUser`: Updates the specified user
 * - `deleteUser`: Deletes the specified user
 */
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
};
