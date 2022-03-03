const fs = require("fs");
exports.getComment = (req, res, next) => {
  var CommentName = req.query.CommentName;
  var CommentEmail = req.query.CommentEmail;
  var CommentFeel = req.query.CommentFeel;
  var Comment = req.query.Comment;
  var comments = fs.readFileSync(__dirname + "/jsons/comment.json");
  var comments = JSON.parse(comments);
  var newComment = {
    Name: CommentName,
    Email: CommentEmail,
    Feel: CommentFeel,
    CommentRecieved: Comment,
  };
  comments.data[comments.data.length] = newComment;
  fs.writeFile(
    __dirname + "/jsons/comment.json",
    JSON.stringify(comments),
    (err) => {
      if (err) return res.json({ success: "false" });
      else return res.json({ success: "true" });
    }
  );
};
