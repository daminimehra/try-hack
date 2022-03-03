const path = require("path");

const express = require("express");

const commentController = require("../controllers/comment");

const router = express.Router();

router.get("/setComment", commentController.getComment);

module.exports = router;
