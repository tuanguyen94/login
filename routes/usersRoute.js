var express = require('express');
var userRouter = express.Router();
var userCtrl = require('../controller/userController');

/* GET users listing. */


userRouter.get('/login',userCtrl.GETlogin);
userRouter.get('/signup',userCtrl.GETsignup);

//userRouter.post('/login',userCtrl.POSTfindUser);
userRouter.post('/signup',userCtrl.POSTcreateUser);

userRouter.get('/list',userCtrl.GETlistUser);
userRouter.get('/loadmore',userCtrl.GETloadmore);

userRouter.get('/online',userCtrl.GETonline);
userRouter.get('/onlineList',userCtrl.GETonlineList);

module.exports = userRouter;
