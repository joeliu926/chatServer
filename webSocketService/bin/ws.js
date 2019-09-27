/*
 * @Author: JoeLiu 
 * @Date: 2018-06-26 20:31:01 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-10-17 15:38:22
 */
var WebSocket = require('ws');
var codeMsg = require("../rconfig/error_code.json");
const mongoindex = require('./../../mongoDAO/index')
const messageCtl = require('../../mongoController/message');
const userCtl = require('../../mongoController/user');
var wssPort=process.argv[2];
var WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({ port: wssPort, verifyClient: socketVerify});

var serverClients = {};

mongoindex.connect(function(error){
    if (error) throw error;
  });

function socketVerify(info) {
     var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);

     //console.log('origin',origin)
    //if (origin.length >= 3 && origin[2] == "hello.mc") {
    //    return true;
    //}
    return true;
}

wss.on('connection', function(ws,req) {
    let unionid = '';
    let  tounionid ='';
    if(req.url.indexOf('/chat')>-1){
        
        unionid = req.url.split(':')[1];
        tounionid = req.url.split(':')[2];
        serverClients[unionid+tounionid]={id:unionid+tounionid,ws:ws};
        ws.send(JSON.stringify(
            {
                type:'connected',
                content:{
                    id:unionid
                }
            }));

        //set user online status
        userCtl.modifyUserStatusByUnionID(unionid,1,function(ress){

        });

        //find no read message and resend
        messageCtl.getMessageByDBUnionIDAndNoRead(unionid,tounionid,function(ress){
      
          ress.forEach(msg=>{
            ws.send(JSON.stringify({
                "type":"record",
                "data":{"from":msg.unionid,"content":msg.content,"create_date":msg.create_date}
            }));
            //update database record status
            msg.status =1;
            messageCtl.modifyMessageByDB_ID(msg._id,msg,function(cb){

            });
          });

          //reset noreadcount ==0
          //if(ress.length>0){
            userCtl.modifyHistoryByDBUnionID({
                "unionid":unionid,
                "reUnionid":tounionid,
                "noReadCount":0,
                "Noted":1,   //set the notification status to notifiable
                "disabled":0
            },function(hisres){
            
            }); 
         //  }
        })
        
    }else if(req.url.indexOf('/history')>-1){
        
        ws.send(JSON.stringify(
            {
                type:'connected',
                content:{
                    msg:'connect succeeded!'
                }
            }));
    }else{
        ws.send(JSON.stringify(
            {
                type:'connect error',
                content:{
                }
            }
        ));
    }

    ws.on('message', function(message) {

        //filter data to makesure standard format
        let _msg ='';
        if(typeof message=='string')
        {
            _msg =message;
        }
        else{
            _msg = JSON.stringify(message);
        }
        if(_msg.length<10) return;
        let msgObj = {};

        try{
            _msg =_msg.replace(/\s/g,'');
            msgObj = JSON.parse(_msg);
        }catch(e){
            ws.send(JSON.stringify(codeMsg.JSON_F));
            return;
        }

        //in case of get history 
         if(msgObj.type=='history'){
            userCtl.getHistoryByUnionID(msgObj.data.id,msgObj.data.pageIndex,msgObj.data.pageSize,function(result){
                if(result==0||result==-1){
                    ws.send(JSON.stringify({code:result,data:{}}));
                }else{
                    ws.send(JSON.stringify({code:200,data:result}));
                }
            });
            return;
        }
        //end history


        if(msgObj.data.touser&&msgObj.data.touser.length>0){

        }else{
            ws.send(JSON.stringify(codeMsg.JSON_format_F));
            return;
        }

     

        
        //message forward and record
        switch (msgObj.type){
            case 'message':
                    let messagebody ={
                        "type":"record",
                        "data":{"from":unionid,"content":msgObj.data.content,"create_date":new Date()}
                    };
                    messageCtl.saveMessage({
                        "unionid":unionid,
                        "reUnionid":msgObj.data.touser,
                        "content": msgObj.data.content,
                        "status":0
                    },function(res){
                        if(res._id){
                            sendMessage(msgObj.data.touser,unionid,messagebody,function (sendResult) {

                                ws.send(JSON.stringify(messagebody));
                                //send message success
                                if(sendResult.code==0){
                                    res.status=1;
                                    messageCtl.modifyMessageByDB_ID(res._id,res,function(modify){
                                           
                                    });

                                    //update current user relative object
                                    userCtl.getUserByUnionID(msgObj.data.touser,function(userres){
                                        userCtl.saveHistory({
                                            "unionid":unionid,
                                            "reUnionid":msgObj.data.touser,
                                            "lastTime": new Date(),
                                            "lastWord": msgObj.data.content,
                                            "status":sendResult.code==0?1:0,
                                            "userinfo":userres[0],
                                            "noReadCount":0,
                                            "Noted":1,   //set the notification status to notifiable
                                            "disabled":0 //set status in user
                                        },function(hisres){
                                          
                                        });                                       
                                    });

                                    //update the relative object of the receiving user
                                    userCtl.getUserByUnionID(unionid,function(userres){

                                        userCtl.saveHistory({
                                            "unionid":msgObj.data.touser,
                                            "reUnionid":unionid,
                                            "lastTime": new Date(),
                                            "lastWord": msgObj.data.content,
                                            "noReadCount":0,
                                            "userinfo":userres[0],
                                            "disabled":0 //set status in user
                                        },function(hisres){
                                        
                                        });

                                    });

                                }
                                //send failure
                                else{
                                    // ws.send(JSON.stringify({
                                    //     "type":"system",
                                    //     "data":{"code":"1001","content":"好友不在线，下次上线将看到您的消息。"}
                                    // }));  

                                     //save to the history
                                    messageCtl.getNoReadCount(unionid,msgObj.data.touser,function(ress){

                                        userCtl.getUserByUnionID(msgObj.data.touser,function(userres){
                                            userCtl.saveHistory({
                                                "unionid":unionid,
                                                "reUnionid":msgObj.data.touser,
                                                "lastTime": new Date(),
                                                "lastWord": msgObj.data.content,
                                                "status":sendResult.code==0?1:0,
                                                "userinfo":userres[0],
                                                "noReadCount":0,
                                                "Noted":1,  //set the notification status to notifiable
                                                "disabled":0 //set status in user
                                            },function(hisres){
                                            
                                            });                                       
                                        });

                                        userCtl.getUserByUnionID(unionid,function(userres){

                                            userCtl.saveHistory({
                                                "unionid":msgObj.data.touser,
                                                "reUnionid":unionid,
                                                "lastTime": new Date(),
                                                "lastWord": msgObj.data.content,
                                                "noReadCount":ress||1,
                                                "userinfo":userres[0],
                                                "disabled":0 //set status in user
                                            },function(hisres){
                                            
                                            });

                                        });
                                        
                                    });
                                }

                               
                               
                            });
                        }
                        //save to mongo failure
                        else{
                            ws.send(JSON.stringify({
                                "type":"system",
                                "data":{"code":"1002","content":"消息存储失败！"}
                            }));  
                        }
                    })
                break;

            case 'sbind':
              
                break;
        }
    });

    //destroy connection which is closed
    function closeSocket() {
        delete serverClients[unionid+tounionid];

        //set user online status
        userCtl.modifyUserStatusByUnionID(unionid,0,function(ress){

        });
    };

    //send message until
    function sendMessage(unionid,sunionid, content,cb) {

        if(serverClients[unionid+sunionid]){
            var clientSocket = serverClients[unionid+sunionid].ws;
            if (clientSocket.readyState === WebSocket.OPEN) {
                clientSocket.send(JSON.stringify(content));
                cb&&cb({code:0,msg:'succeed'});
            }else{
                cb&&cb({code:-1,msg:'error'});
            }
        }else{
            cb&&cb({code:-2,msg:'error'});
        }
    }

    ws.on('close', function (req) {
        closeSocket();
        //mongoindex.disconnect(function(err) { });
    });

    ws.on('error', function (req) {
        closeSocket();
        //mongoindex.disconnect(function(err) { });
    });
});
