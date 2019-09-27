/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:34:18 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-31 11:24:37
 */

'use strict';
const userCtl = require('../mongoController/user');


function getUser(req, res, next) {
    userCtl.getUserByUnionIDAndNoEmpty(req.params.id,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}


function postUser(req, res, next) {
    userCtl.saveUser(req.body,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}

function getHistory(req, res, next) {
    userCtl.getHistoryByUnionID(req.params.id,req.query.pageIndex,req.query.pageSize,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}

function getHistoryCount(req, res, next) {
    userCtl.getHistoryCount(req.params.id,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}


function getHistoryByDBID(req, res, next) {
    userCtl.getHistoryByDBUnionID(req.params.id,req.params.rid,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}

function postHistory(req, res, next) {
    userCtl.saveHistory(req.body,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}

function updateHistory(req, res, next) {
    userCtl.modifyHistoryByDBUnionID(req.body,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}

module.exports = {
  getUser,
  postUser,
  getHistory,
  postHistory,
  updateHistory,
  getHistoryByDBID,
  getHistoryCount
};
