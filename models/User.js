const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * Defines the schema for the User model, which represents a user in the application.
 * The schema includes the following fields:
 * - name: a required string representing the user's name
 * - email: a required and unique string representing the user's email address
 * - password: a required string representing the user's password
 * - role: a string representing the user's role, which can be either "user" or "admin" (default is "user")
 * The schema also includes timestamps for when the user document was created and last updated.
 */
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

/**
 * Middleware function that hashes the user's password before saving it to the database.
 * This middleware is executed before the 'save' event on the User model.
 * It checks if the password has been modified, and if so, generates a salt and hashes the password using bcrypt.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password.startsWith("$2a$"))
    return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
