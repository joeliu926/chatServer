/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:43:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-14 08:53:40
 */

'use strict';
const express = require('express');
const router = express.Router();
var path = require("path");
var fs = require("fs");
const urlConfig=require("../config/uploadConfig");
const multiparty = require('multiparty');
var bodyParser = require('body-parser');
var formidable = require('formidable');

const resourceController = require('../controllers/resource');

router.post('/',function(req,res,next){

    let originType = req.query.t;
    let _id = req.query.id;
    let classes = req.query.c;
    let typs = req.query.tp;
    let urls =[];

    try{
        if(classes==0){
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir =  urlConfig.path.save;
            form.keepExtensions = true;//保留后缀
            form.maxFieldsSize = 200 * 1024 * 1024;
            //处理图片
            form.parse(req, function (err, fields, files){
    
                let pormislist  =[];
                for(let field in files){
                    let reqbody={body:{
                        type:typs,
                        originType: originType,
                        classes:classes,
                        size:files[field].size,
                        r_id: _id,
                        name: files[field].name,
                        url: files[field].path.split("public")[1]
                    }};
                    
                    pormislist.push( new Promise((resolve) => {
                        resourceController.postResource(reqbody,res,function(resurl){
                            urls.push(resurl);
                            resolve('');
                        }); 
                    }));
                }
        
                Promise.all(pormislist).then(function (results) {
                    res.send({code:0,msg:'上传成功',data:urls})
                });
            })
        }
        else{
            let reqbody={body:{
                type:typs,
                originType: originType,
                classes:classes,
                size:req.body.size,
                r_id: _id,
                name: req.body.name,
                url:req.body.url
            }};
           
            resourceController.postResource(reqbody,res,function(resurl){ 
                res.send({code:0,msg:'上传成功',data:resurl})
            });
        }
    }catch(ex){
        res.send({code:1001,msg:'上传失败'+ex,data:{}})
    }
});


module.exports = router;
