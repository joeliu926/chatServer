/*
 * @Author: JoeLiu 
 * @Date: 2018-05-02 10:24:30 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-09-03 13:23:16
 */

const bootConfig=require('./bootConfig.json'); 
const bootenv=bootConfig.bootenv||bootConfig.defaultenv; //bootenv
let urlPath={
        dev:{
          remoteHost:"https://api-dev.nihaomc.com/"
        },
        sit:{
          remoteHost:"https://api-dev.nihaomc.com/"
        },
        uat:{
          remoteHost:"https://api-uat.nihaomc.com/"
        },
        prd:{
          remoteHost:"https://api-prd.nihaomc.com/"
        }
    }
 
module.exports=urlPath[bootenv];