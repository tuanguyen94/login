/**
 * Created by Naut on 07-Apr-16.
 */
'use strict';
//require thu vien tuong tac voi mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//tao cau truc table user dung Schema
var schema = mongoose.Schema({
    title: {type: 'String'},
    parent : [Schema.Types.ObjectId]
});

module.exports = mongoose.model('comment',schema);