/**
 * Created by Naut on 07-Apr-16.
 */
var express = require('express');
var commentRouter = express.Router();
var commentCrl = require('../controller/commentController');

commentRouter.get('/', commentCrl.GetComment);

commentRouter.post('/',commentCrl.POSTcomment);

module.exports = commentRouter;