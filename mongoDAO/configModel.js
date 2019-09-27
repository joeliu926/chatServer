/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 18:03:02 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-12 12:07:26
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var configSchema = new Schema({
    name:String,
    key0:String,
    key1:String,
    key2:String,
    key3:String,
    key4:String,
    key5:String,
    key6:String,
    key7:String,
    key8:String,
    key9:String,
    key10:String,
    key11:String,
    key12:String,
    key13:String,
    key14:String,
    key15:String,
    key16:String,
    key17:String,
    key18:String,
    key19:String,
    desc:String,
    create_date: { type: Date, default: Date.now }
});
mongoose.model('config', configSchema);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}
