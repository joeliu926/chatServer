/*
 * @Author: JoeLiu 
 * @Date: 2018-06-26 17:50:35 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-11 16:21:31
 */

'use strict';
const notificationModels = require('../mongoDAO/notificationModel');

var notificationM =notificationModels.Schema("notification").model;

function saveNote(body,cb) {
    var noteUtail = new notificationM();
    noteUtail.unionid =body.unionid;
    noteUtail.reUnionid = body.reUnionid;
    noteUtail.relativeid =body.relativeid;
    noteUtail.status = body.status;
    noteUtail.messagetime = body.messagetime;
    noteUtail.url = body.url;
    noteUtail.content = body.content;
    noteUtail.save(function (err, row) {
        if (err) {
            console.log('err',err);
            cb&&cb(-1);
        }else{
            cb&&cb(row);
        }
    });
}




function getNoteByDBUnionID(id,rid,times,cb) {
    if(id){
        notificationM.find({unionid:id,reUnionid:rid,messagetime:times,status:1}, function (err, row) {
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




module.exports = {
    getNoteByDBUnionID,
    saveNote
};
