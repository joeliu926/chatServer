/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 17:30:31 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-06-27 11:47:14
 */

var dburl = require("../config/mongoConfig").path;
var mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;
exports.connect = function(callback) {
    mongoose.connect(dburl);
}
exports.mongoObj = function(){
	return 	mongoose;
}

exports.disconnect=function(cb){
    mongoose.disconnect();
    cb&&cb();
}

/// create a connection to the DB
exports.CreateConnection=function(callback,returnFunc){
    var connection = mongoose.createConnection(dburl);

    connection.on('open', function() {
    callback(connection,Admin,returnFunc);
});
}