/**
 * Created by Naut on 02-Apr-16.
 */

var User = require('../model/userModel');
var Session = require('../model/sessionModel');
var SessionID_SID = require('../model/sessionID_SIDModel');


function getSession(cname,sessionData) {
    var buffer = sessionData.toString().split('\"');
    for(var i=0; i<buffer.length - 2 ; i++) {
        if(buffer[i]== cname && buffer[i+2] != null && buffer[i+2] != "null") return buffer[i+2];
}
    return "";
}

var UserCtrl = {
  POSTcreateUser: function(req,res){
      var newUser = new User();
      newUser.username = req.body.username;
      newUser.password = req.body.password;
      newUser.email = req.body.email;
      User.find({username: req.body.username},function(err,user){
         if(err){
             res.send(err);
         }
          else if(user.length == 0){
             newUser.save(function(err,user){
                 if(err){
                     res.send(err);
                 }
                 else{
                     req.session.isActive = true;
                     req.session.username = req.body.username;
                     //res.json(user);
                     res.redirect('/');
                 }
             })
         }
          else{
             res.send("Username already exist !!");
         }
      });

  },
    POSTfindUser: function(req,res){
        User.find({
            username: req.body.username,
            password: req.body.password
        },function(err,user){
            if(err){
                res.send(err);
            }
            else
            {
                req.session.username = req.body.username;
                req.session.isActive = true;
                //res.json(user);
                res.redirect('/');
            }
        })
    },
    GETlogin: function(req,res){
        res.render('login');
    },
    GETsignup: function (req,res) {
        res.render('signup');
    },
    GETlistUser: function (req,res) {
        res.render('list');
    },
    GETloadmore: function(req,res){
        //query database and return 5 more user
    },
    GETonline: function(req,res){
        res.render('online');


    },
    GETonlineList: function(req,res) {
        //query database collection sessionid_sids
        //get sessionID online
        //query collection sessions
        //get username add to list
        var list_user = [];
        var array = [];
        var returnString ="";
        SessionID_SID.find({},function(err,results){
            results.forEach(function(item){
                array.push(item.sessionID);
            });
            Session.find({},'-_id').where('_id').in(array).select('session').exec(function(err,results){
                results.forEach(function(item){
                    var newUsername = getSession("username",item.session);
                    if(list_user.indexOf(newUsername)<0) list_user.push(newUsername);
                });
                for(var j =0;j<list_user.length;j++){
                    returnString+= "<li>"+ list_user[j] +"</li>";
                }
                res.send(returnString);
            });

        });
    }
};

module.exports = UserCtrl;