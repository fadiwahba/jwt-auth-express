/**
 * Connects to the MongoDB database using the provided connection URI.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} - Resolves when the connection is established, or rejects with an error.
 */
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
