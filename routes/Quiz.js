const path = require("path");

const express = require("express");

const quizController = require("../controllers/quiz");

const router = express.Router();

router.get("/getQuestions", quizController.getQuestions);

module.exports = router;
