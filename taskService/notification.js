/*
 * @Author: JoeLiu 
 * @Date: 2018-07-10 14:01:31 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-08-04 16:16:38
 */
'use strict';
const userCtl = require('../mongoController/user');
const noteCtl = require('../mongoController/notification');
var httpClient=require('../utils/httpClient');
var CONSTANT = require('../config/remoterequest');
var appUtil=require('../utils/appUtils');

var defualtCfg={
    url:CONSTANT.remoteHost+'csc/api/wxaMsg/',
    contentType:'application/json'
};

function start(){
    userCtl.getHistoryWhereNoRead(function(data){
        data.forEach(element => {

            let sendType=0; //0 c端 1 b端
            let needsend = false; //true 需要发送，false 不需要发送
            let lastTime =new Date(element.lastTime).getTime();
            let currentTime = new Date().getTime();

            // data auth 
            if(element.userinfo&&element.lastWord&&element.lastTime){

                userCtl.getUserByUnionID(element.unionid,function(userinfo){

                    if(userinfo[0]&&userinfo[0].userid>0){
                        sendType=1;
                        if(currentTime-lastTime>=2 * 60 * 1000){
                            needsend=true;
                        }
                    }else{
                        if(currentTime-lastTime>=3 * 60 * 1000){
                            needsend=true;
                        }
                    }
        
                    if(needsend){   
                        noteCtl.getNoteByDBUnionID(element.unionid,element.reUnionid,element.lastTime,function(reobj){
        
                            if(reobj.length==0){
                                //let surl = `/pages/chat/Bchatface/Bchatface?reUnionid=${element.unionid}&cUnionid=${element.reUnionid}`;
                                let surl = `pages/chat/Bchat/Bchat`;
        
                                if(sendType==0){
                                    surl =`pages/chat/Cchat/Cchat`;
                                }
        
                                var saveObj ={
                                    unionid:element.unionid,
                                    reUnionid:element.reUnionid,
                                    relativeid:element._id,
                                    status:1, //1发送成功  0发送失败
                                    messagetime:element.lastTime,
                                    url: surl,
                                    content: element.lastWord,
                                };
        
                                noteCtl.saveNote(saveObj,function(savebak){
                                        
                                        defualtCfg.method="POST";
                                        var opt=appUtil.extend({},defualtCfg);
        
                                        if(sendType==0){
                                            opt.url+=`sendXCX`;
                                        }else{
                                            opt.url+=`sendGZH`;
                                        }
                                        
                                        opt.data={
                                            "paramJson":`{'userName':'${element.userinfo.nickName}','lastTime':'${new Date(element.lastTime).toUTCString()}','content':'${element.lastWord}'}`,
                                            "unionId":element.unionid,
                                            "reunionId":"",//element.reUnionid,
                                            "pagePath":surl
                                        };
                                        
                                        opt.callBack=function(error, response, body){
                                            
                                            if(error)
                                            {
                                                //    res.send(error);
                                                console.log(error)
                                            }
                                            else {
                                                //res.send(JSON.parse(body));
                                                console.log(body);
                                            }
                                        };
                                        httpClient(opt);
                                        
                                });


                                userCtl.saveHistory({
                                    "unionid":element.unionid,
                                    "reUnionid":element.reUnionid,
                                    "Noted":2
                                },function(hisres){
                                
                                }); 
                            }
        
                        });
                    }
                })
            }
        });
    })
}


module.exports={
    start
}