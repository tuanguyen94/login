/**
 * Created by Naut on 07-Apr-16.
 */
var Comment = require('../model/commentModel');

var commentCtrl = {

  GetComment: function (req,res){
      //get and display all post
    Comment.find({})
    res.render('comment');
  },
  POSTnewpost: function (req,res) {
    var newComment = new Comment();
    newComment.title = req.body.comment;
    newComment.parent = null;
    newComment.save(function (err,comment) {
      if(err){
        res.send(err);
      }
      else {
        res.send("post updated")
      }
    });

  },
  POSTcomment: function(req,res){
    var newComment = new Comment();
    newComment.title = req.body.comment;
    newComment.parent = req.body.parent;
    newComment.save(function (err,comment) {
      if(err){
        res.send(err);
      }
      else {
        res.send("comment updated")
      }
    });
  }
};

module.exports = commentCtrl;