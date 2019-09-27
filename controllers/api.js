/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:34:18 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-10-16 16:58:15
 */

'use strict';
const configCtl = require('../mongoController/config');
const userCtl = require('../mongoController/user');
const msgCtl = require('../mongoController/message');

function getConfig(req, res, next) {
    configCtl.getConfigByName(req.params.name,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}

function setConfig(req, res, next) {

    configCtl.saveConfig(req.body,function(result){
        if(result==0||result==-1){
            res.json( {code:result,data:{}});
        }else{
            res.json({code:200,data:result});
        }
    });
}


function setstatus(req, res, next) {
   
    if(req.body.unionid&&req.body.userStatus){
        
        if(req.body.userStatus==2){
            userCtl.modifyUserIdAndUserName(req.body.unionid,"","",function(result){
                if(result==0||result==-1){
                   // res.json( {code:result,data:{}});
                }else{
                  //  res.json({code:200,data:result});
                }
            });

            userCtl.setHistoryDisabledByUnionID(req.body.unionid,1,function(result){

            });

            //更新用户状态
            msgCtl.modifyMessageShowTypeByUnionID(req.body.unionid,{showType:2},function(cb){

            });

            msgCtl.modifyMessageShowTypeByReUnionID(req.body.unionid,{showType:1},function(cb){

            });

        }

        if(req.body.userStatus==5){
            userCtl.modifyUserIdAndUserName(req.body.unionid,req.body.userid,req.body.userName,function(result){
                if(result==0||result==-1){
                   // res.json( {code:result,data:{}});
                }else{
                  //  res.json({code:200,data:result});
                }
            });
        }
 
        userCtl.modifyUserStatus(req.body.unionid,req.body.userStatus,function(result){
            if(result==0||result==-1){
                res.json( {code:result,data:{}});
            }else{
                res.json({code:200,data:result});
            }
        })
    }else{
        res.json({code:406,data:"Unrecognized uniondid or userStatus"});

    }
    
}

module.exports = {
    getConfig,
    setConfig,
    setstatus
};
