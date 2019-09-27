/*
 * @Author: JoeLiu 
 * @Date: 2018-06-26 17:50:35 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-12 14:37:54
 */

'use strict';
const configModels = require('../mongoDAO/configModel');

var configM =configModels.Schema("config").model;

function saveConfig(body,cb) {

    getConfigByName(body.name,function(row){

        if(row.name){

            configM.update({name:body.name},body,function (err, row) {
                if (err) {
                    console.log("err",err);
                    cb&&cb(-1);
                }else{
                    cb&&cb(row);
                }
            });
  
        }else{


            var configU = new configM();
            configU.name =body.name;
            configU.key0 =body.key0;
            configU.key1 =body.key1;
            configU.key2 =body.key2;
            configU.key3 =body.key3;
            configU.key4 =body.key4;
            configU.key5 =body.key5;
            configU.key6 =body.key6;
            configU.key7 =body.key7;
            configU.key8 =body.key8;
            configU.key9 =body.key9;
            configU.key10 =body.key10;
            configU.key11 =body.key11;
            configU.key12 =body.key12;
            configU.key13 =body.key13;
            configU.key14 =body.key14;
            configU.key15 =body.key15;
            configU.key16 =body.key16;
            configU.key17 =body.key17;
            configU.key18 =body.key18;
            configU.key19 =body.key19;
            configU.desc =body.desc;
            configU.save(function (err, row) {
                if (err) {
                    console.log('err',err);
                    cb&&cb(-1);
                }else{
                    cb&&cb(row);
                }
            });
        }
        
    })
}




function getConfigByName(name,cb) {
    if(name){
        configM.findOne({name:name}, function (err, row) {
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
    saveConfig,
    getConfigByName
};
