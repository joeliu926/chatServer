/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 18:03:02 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-11 16:53:11
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notificationSchema = new Schema({
    unionid:String,
    reUnionid:String,
    relativeid:String,
    status:{ type: Number, default:0}, //1发送成功  0发送失败
    messagetime:{ type: Date, default: Date.now },
    url: String,
    content: String,
    create_date: { type: Date, default: Date.now }
});
mongoose.model('notification', notificationSchema);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}
