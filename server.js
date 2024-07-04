/**
 * Starts the server and connects to the database.
 *
 * This function is the entry point for the server application. It first connects to the database using the `connectDB` function, and then starts the server using the `app.listen` method, listening on the specified port.
 *
 * If an error occurs during the startup process, it is logged to the console.
 */
const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
