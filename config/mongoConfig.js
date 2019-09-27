/*
 * @Author: JoeLiu 
 * @Date: 2018-05-02 10:24:30 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-09-03 13:23:29
 */

const bootConfig=require('./bootConfig.json'); 
const bootenv=bootConfig.bootenv||bootConfig.defaultenv; //bootenv
let urlPath={
        dev:{
          path:"mongodb://10.0.2.12:27017/chatdev"
        },
        sit:{
          path:"mongodb://10.0.2.12:27017/chatdev"
        },
        uat:{
          path:"mongodb://10.0.2.12:27017/chattest"
        },
        prd:{
          path:"mongodb://mongouser:dreamdream999@10.0.0.12:27017/chat?authSource=admin"
        }
    }
 
module.exports=urlPath[bootenv];