/*
 * @Author: JoeLiu 
 * @Date: 2018-05-02 10:24:30 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-06-29 16:26:17
 */

const bootConfig=require('./bootConfig.json'); //
var path = require("path");
var localdir =path.resolve(__dirname, '..');
const bootenv=bootConfig.bootenv||bootConfig.defaultenv; //bootenv
let urlPath={
        dev:{
          root:"https://localhost:9003",
          path:{
           save:localdir+'/public/files',
           read:'public/files'
          }
        },
        sit:{
          root:"https://localhost:9003",
          path:{
           save:localdir+'/public/files',
           read:'public/files'
          }
        },
        uat:{
          root:"https://localhost:9003",
          path:{
           save:localdir+'/public/files',
           read:'public/files'
          }
        },
        prd:{
          root:"https://api.prettywhale.com/",
          path:{
           save:localdir+'/public/files',
           read:'public/files'
          }
        }
    }
 
module.exports=urlPath[bootenv];