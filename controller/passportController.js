/**
 * Created by Naut on 06-Apr-16.
 */

var passportCrl = {
  Getpassport: function (req,res) {
      if(req.session.passport !=null){
          res.render('passport',{user: req.session.passport.user});
      }
      else {
          res.send("you cannot enter this link");
      }

  }
};

module.exports = passportCrl;