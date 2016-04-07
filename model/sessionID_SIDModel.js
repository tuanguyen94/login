/**
 * Created by Naut on 05-Apr-16.
 */


'use strict';
//require thu vien tuong tac voi mongodb
var mongoose = require('mongoose');

//tao cau truc table user dung Schema
var schema = mongoose.Schema({
    sessionID: {type: 'String', require: true},
    SID: {type: 'String', require: true}
});

module.exports = mongoose.model('SessionID_SID',schema);
