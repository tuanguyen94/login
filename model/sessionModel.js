/**
 * Created by Naut on 05-Apr-16.
 */

'use strict';
//require thu vien tuong tac voi mongodb
var mongoose = require('mongoose');

//tao cau truc table user dung Schema
var schema = mongoose.Schema({
    _id : {type: 'String'},
    session: {type: 'String'},
    experies: {type: 'Date'}
});

module.exports = mongoose.model('session',schema);