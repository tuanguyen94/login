/**
 * Created by Naut on 02-Apr-16.
 */

'use strict';
//require thu vien tuong tac voi mongodb
var mongoose = require('mongoose');

//tao cau truc table user dung Schema
var schema = mongoose.Schema({
    username: {type: 'String', require: true},
    password: {type: 'String', require: true},
    email: {type: 'String'}
});

module.exports = mongoose.model('User',schema);
