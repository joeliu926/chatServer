/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 18:03:02 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-10-16 16:31:55
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    unionid:String,
    reUnionid: String,
    content: String,
    status:{ type: Number, default:0},// 0未读  1已读
    showType:{ type: Number, default:0},// 0都显示  1 只显示给发送者 2 只显示给接收者 3 都不显示
    create_date: { type: Date, default: Date.now }
});
mongoose.model('message', messageSchema);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}