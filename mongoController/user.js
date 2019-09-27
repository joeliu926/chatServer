/*
 * @Author: JoeLiu 
 * @Date: 2018-06-26 17:50:38 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-10-18 19:57:39
 */

'use strict';
const userInfoModels = require('../mongoDAO/userinfoModel');
const userRelativeModels = require('../mongoDAO/userRelativeModel');
var userinfoM =userInfoModels.Schema("userinfo").model;
var userrelativeM =userRelativeModels.Schema("userrelative").model;

//get user by unionid 
function getUserByUnionID(unionid,cb) {
    if(unionid){
        userinfoM.find({unionid:unionid}, function (err, row) {
            if (err) {
                cb&&cb(-1);
            }
            else if (!row) {
                cb&&cb(0);
            }else{
                cb&&cb(row);
            }
            
        });
    }else{
        cb&&cb(0);
    }
}

//get user by unionid and promise no empty
function getUserByUnionIDAndNoEmpty(unionid,cb) {
    if(unionid){
        userinfoM.find({unionid:unionid}, function (err, row) {
            if (err) {
                cb&&cb(-1);
            }
            else if (row.length==0) {

                let rand = parseInt(Math.random()*(99999-10000+1)+10000,10); 
                var userinfoUtil = new userinfoM();
                userinfoUtil.unionid =unionid;
                userinfoUtil.nickName ="游客"+rand,
                userinfoUtil.avatarUrl ="https://node-wxa.nihaomc.com/feimg/img-demo.png",

                userinfoUtil.save(function (err, row) {
                    if (err) {
                        cb&&cb(-1);
                    }else{
                        cb&&cb([row]);
                    }
                });
            }else{
                cb&&cb(row);
            }
        });
    }else{
        cb&&cb(0);
    }
}

function modifyUserStatusByUnionID(unionid,status,cb) {
    userrelativeM.updateMany({reUnionid:unionid},{status:status},function (err, row) {
        // if (err) {
        //     console.log("err",err);
        //     cb&&cb(-1);
        // }else{
        //     cb&&cb(row);
        // }
    });
    userinfoM.update({unionid:unionid},{status:status},function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}

function modifyUserIdAndUserName(unionid,userid,username,cb) {

 
        userinfoM.update({unionid:unionid},{userid:userid,userName:username},function (err, row) {
            if (err) {
                console.log("err",err);
                cb&&cb(-1);
            }else{
                cb&&cb(row);
            }
        });
  
}


function modifyUserStatus(unionid,userStatus,cb) {

    userinfoM.update({unionid:unionid},{userStatus:userStatus},function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
    
}

function modifyUserByUnionID(body,cb) {
    userinfoM.update({unionid:body.unionid},body,function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}

function saveUser(body,cb) {
    getUserByUnionID(body.unionid,function(res){
        if(res.length==0){
            var userinfoUtil = new userinfoM();
            userinfoUtil.unionid =body.unionid;
            userinfoUtil.nickName =body.nickName;
            userinfoUtil.gender =body.gender;
            userinfoUtil.language = body.language;
            userinfoUtil.city= body.city;
            userinfoUtil.province =body.province;
            userinfoUtil.country =body.country;
            userinfoUtil.avatarUrl =body.avatarUrl;
            userinfoUtil.openid =body.openid;
            userinfoUtil.userid =body.userid;
            userinfoUtil.username =body.username;
            userinfoUtil.status =0;
            userinfoUtil.save(function (err, row) {
                if (err) {
                    cb&&cb(-1);
                }else{
                    cb&&cb(row);
                }
            });
        }else{

            let updateObj ={};
            body.nickName&&(updateObj.nickName =body.nickName);
            body.gender&&(updateObj.gender =body.gender);
            body.language&&(updateObj.language = body.language);
            body.city&&(updateObj.city= body.city);
            body.province&&(updateObj.province =body.province);
            body.country&&(updateObj.country =body.country);
            body.avatarUrl&&(updateObj.avatarUrl =body.avatarUrl);
            body.openid&&(updateObj.openid =body.openid);
            body.userid&&(updateObj.userid =body.userid);
            body.username&&(updateObj.username =body.username);

            userinfoM.update({unionid:body.unionid},updateObj,function (err, row) {
                if (err) {
                    console.log("err",err);
                    cb&&cb(-1);
                }else{
                    cb&&cb(row);
                }
            });
          
        }
    })
}

function getHistoryByUnionID(unionid,pageIndex,pageSize,cb) {
    if(unionid){

        let _index =0;

        if(pageIndex==0||pageIndex==1){
            _index =0;
        }else{
            _index=(pageIndex-1)*pageSize;
        }

       let   pagenationg = {sort:{noReadCount:-1,lastTime:-1,status:-1},skip: parseInt(_index),limit:parseInt(pageSize)};
      userrelativeM.find({unionid:unionid,disabled:{$ne:1}},null,pagenationg,function (err, row) {

        userrelativeM.count({unionid:unionid,disabled:{$ne:1}},function(cerr,crow){
            if (err) {
                cb&&cb(-1);
              }else  if (!row) {
                cb&&cb(0);
              }else{
                cb&&cb({list:row,count:crow});
              }
        });
    });
  }else{
    return 0;
  }
}

function getHistoryWhereNoRead(cb) {
      userrelativeM.find({noReadCount:{$gt:0},Noted:1,disabled:{$ne:1}},function (err, row) {
        if (err) {
            cb&&cb(-1);
          }else  if (!row) {
            cb&&cb(0);
          }else{
            cb&&cb(row);
          }
    });
}

function getHistoryByDBUnionID(unionid,reunionid,cb) {
    if(unionid){
        userrelativeM.find({unionid:unionid,reUnionid:reunionid}, function (err, row) {
          if (err) {
            cb&&cb(-1);
          }
          else if (!row) {
            cb&&cb(0);
          }else{
            cb&&cb(row);
          }
          
      });
  }else{
    return 0;
  }
}

function getHistoryCount(unionid,cb) {
    if(unionid){
        userrelativeM.count({unionid:unionid,noReadCount:{$gt:0},disabled:{$ne:1}}, function (err, row) {
          if (err) {
            cb&&cb(-1);
          }
          else if (!row) {
            cb&&cb(0);
          }else{
            cb&&cb(row);
          }
      });
  }else{
    return 0;
  }
}

function saveHistory(body,cb) {

    getHistoryByDBUnionID(body.unionid,body.reUnionid,function(res){
        if(res.length==0){
            //insert new history when it doesn't exist
            var userrelativeUntial = new userrelativeM();
            userrelativeUntial.unionid =body.unionid;
            userrelativeUntial.reUnionid =body.reUnionid;
            userrelativeUntial.lastTime =body.lastTime;
            userrelativeUntial.lastWord =body.lastWord;
            userrelativeUntial.noReadCount = body.noReadCount?body.noReadCount:0;
            userrelativeUntial.status= body.status?body.status:0;
            userrelativeUntial.userinfo= body.userinfo;
            userrelativeUntial.Noted= body.Noted?body.Noted:1;
            userrelativeUntial.disabled= body.disabled?body.disabled:0;
            userrelativeUntial.save(function (err, row) {
                if (err) {
                    console.log("err",err);
                    cb&&cb(-1);
                }else{
                    cb&&cb(row);
                }
            });
        }else{
             //update history when it  exist
            modifyHistoryByDBUnionID(body,cb);
        }

    })
}

function modifyHistoryByDBUnionID(body,cb) {
    userrelativeM.update({unionid:body.unionid,reUnionid:body.reUnionid},body,function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}

function setHistoryDisabledByUnionID(unionid,types,cb) {
    userrelativeM.updateMany({unionid:unionid},{disabled:types,lastWord:''},function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}

module.exports = {
    getUserByUnionID,
    saveUser,
    getHistoryByUnionID,
    getHistoryByDBUnionID,
    saveHistory,
    modifyHistoryByDBUnionID,
    modifyUserByUnionID,
    modifyUserStatusByUnionID,
    getHistoryCount,
    getHistoryWhereNoRead,
    modifyUserIdAndUserName,
    modifyUserStatus,
    getUserByUnionIDAndNoEmpty,
    setHistoryDisabledByUnionID
};
