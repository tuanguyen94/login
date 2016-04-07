/**
 * Created by Naut on 06-Apr-16.
 */
var express = require('express');
var passportRouter = express.Router();
var passportCrl = require('../controller/passportController');

passportRouter.get('/', passportCrl.Getpassport);

module.exports = passportRouter;