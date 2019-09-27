/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 18:03:02 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-13 10:39:24
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    unionid:String,
    openid:String,
    userid:String,
    userName:String,
    userStatus:{ type: Number, default:0},// 1:禁用 2：解绑 3：诊所过期 4 启用
    nickName: String,
    gender: Number,
    language: String,
    city: String,
    province: String,
    country:String,
    avatarUrl: String,
    status:{ type: Number, default:0}, //0离线  1在线  2忙绿  3隐身
    create_date: { type: Date, default: Date.now }
});
mongoose.model('userinfo', userSchema);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}
