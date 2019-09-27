/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:34:18 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-12 14:26:39
 */

'use strict';
const messageCtl = require('../mongoController/message');

function getMessage(req, res, next) {
    
    messageCtl.getMessageRecordByDBUnionID(req.query.id,req.query.rid,req.query.pageIndex,req.query.pageSize,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}

function postMessage(req, res, next) {

    messageCtl.saveMessage(req.body,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
 
}

module.exports = {
    getMessage,
    postMessage
};