/*
 * @Author: JoeLiu 
 * @Date: 2018-06-26 17:50:35 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-10-16 17:58:27
 */

'use strict';

const messageModels = require('../mongoDAO/messageModel');
var messageM =messageModels.Schema("message").model;

function getMessageByUnionID(unionid,cb) {
    if(unionid){
        messageM.find({unionid:unionid, showType:{$nin:[2,3]}}, function (err, row) {
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


function saveMessage(body,cb) {
    var messageUtail = new messageM();
    messageUtail.unionid =body.unionid;
    messageUtail.reUnionid = body.reUnionid;
    messageUtail.content =body.content;
    messageUtail.status = body.status;
    messageUtail.showType = 0;
    messageUtail.save(function (err, row) {
        if (err) {
            console.log('err',err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}


function modifyMessageByDBUnionID(body,cb) {
    messageM.update({unionid:body.unionid,reUnionid:body.reUnionid},body,function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}


function modifyMessageShowTypeByUnionID(unionid,body,cb) {
    messageM.updateMany({unionid:unionid},body,function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}

function modifyMessageShowTypeByReUnionID(unionid,body,cb) {
    messageM.updateMany({reUnionid:unionid},body,function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}


function modifyMessageByDB_ID(id,body,cb) {
    messageM.update({_id:id},body,function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}



function getNoReadCount(id,rid,cb) {
    messageM.count({unionid:id,reUnionid:rid,status:0, showType:{$nin:[2,3]}},function (err, row) {
        if (err) {
            console.log("err",err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}


function getMessageByDBUnionIDAndNoRead(id,rid,cb) {
    if(id){
        messageM.find({unionid:rid,reUnionid:id,status:0}, function (err, row) {
          if (err) {
            cb&&cb(-1);
          }
          else if (!row) {
            cb&&cb(0);
          } else{
            cb&&cb(row);
          }
          
      });
    }else{
        cb&&cb(0);
    }
}


function getMessageRecordByDBUnionID(id,rid,pageIndex,pageSize,cb) {
    if(id){

        let _index =0;

        if(pageIndex==0||pageIndex==1){
            _index =0;
        }else{
            _index=(pageIndex-1)*pageSize;
        }

        messageM.find({"$or":[{unionid:rid,reUnionid:id,status:1,showType:{$nin:[1,3]}},{unionid:id,reUnionid:rid,showType:{$nin:[2,3]}}]},null,{sort:{create_date:-1},skip: parseInt(_index),limit:parseInt(pageSize)}).exec( function (err, row) {

            messageM.count({"$or":[{unionid:rid,reUnionid:id,status:1,showType:{$nin:[1,3]}},{unionid:id,reUnionid:rid,showType:{$nin:[2,3]}}]},function(cerr,crow){
                if (err) {
                    cb&&cb(-1);
                  }
                  else if (!row) {
                    cb&&cb(0);
                  } else{
                      row.sort(function(a,b){return a.create_date-b.create_date});
                      cb&&cb({list:row,count:crow});
    
                  }
            });
        });
    }else{
        cb&&cb(0);
    }
}

module.exports = {
    getMessageByUnionID,
    saveMessage,
    modifyMessageByDBUnionID,
    modifyMessageByDB_ID,
    getNoReadCount,
    getMessageByDBUnionIDAndNoRead,
    getMessageRecordByDBUnionID,
    modifyMessageShowTypeByUnionID,
    modifyMessageShowTypeByReUnionID
};
