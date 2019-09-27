/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 18:03:02 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-08-04 16:33:33
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userrelative = new Schema({
    unionid:String,
    reUnionid:String,
    lastTime:{ type: Date, default: Date.now },
    lastWord:String,
    noReadCount:{ type: Number, default:0},
    Noted:{ type: Number, default:1}, //1没通知  //2已经通知
    status:{ type: Number, default:0}, //0离线  1在线  2忙绿  3隐身
    disabled:{ type: Number, default:0}, //0可用  1不可用
    userinfo:{
        unionid:String,
        openid:String,
        userid:String,
        userName:String,
        nickName: String,
        gender: Number,
        language: String,
        city: String,
        province: String,
        country:String,
        avatarUrl: String,
        status:Number, //0离线  1在线  2忙绿  3隐身
        create_date: { type: Date, default: Date.now }
    },
    create_date:{ type: Date, default: Date.now }
});
mongoose.model('userrelative', userrelative);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}