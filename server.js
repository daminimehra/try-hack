const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const colors = require("colors");
const connectDB = require("./config/db");
const { dirname } = require("path");
const app = express();

//Load dotenv vars
dotenv.config({ path: "./config/config.env" });

app.use(express.static("views"));
app.use(express.static("jsons"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//connect to database
connectDB();

//ROUTES & RESPONSE

const quiz = require("./routes/Quiz");
const comment = require("./routes/comment");

//body parser
app.use(express.json());
const PORT = process.env.PORT || 5000;

//Mount routers
app.use(quiz);
app.use(comment);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//handle unhandled rejection

process.on("unhandledRejection", (err, promise) => {
  console.log(`error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
