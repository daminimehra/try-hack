const fs = require("fs");

exports.getQuestions = (req, res, next) => {
  var Qfile = fs.readFileSync(__dirname + "/jsons/questions.json");
  var questionList = JSON.parse(Qfile);
  res.json(questionList);
};
