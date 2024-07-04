/**
 * Configures and exports an Express application.
 * 
 * This file sets up the Express application with the necessary middleware and routes.
 * It imports the required dependencies, configures the application, and exports the
 * application instance for use in other parts of the application.
 *
 * @module app
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

// Export the app for testing
module.exports = app;
