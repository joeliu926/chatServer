/*
 * @Author: JoeLiu 
 * @Date: 2018-05-02 10:24:30 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-12 10:37:00
 */

const bootConfig=require('./bootConfig.json'); 
const bootenv=bootConfig.bootenv||bootConfig.defaultenv; //bootenv
let urlPath={
        dev:{
          host:'47.104.65.117',
          user: 'wearetheking',
          password:'Weare0917!',
          port:3306,
          database :'yiingdb'
        },
        sit:{
          host:'127.0.0.1',
          user: 'wearetheking',
          password:'Weare0917!',
          port:3306,
          database :'yiingdb'
        },
        uat:{
          host:'127.0.0.1',
          user: 'wearetheking',
          password:'Weare0917!',
          port:3306,
          database :'yiingdb'
        },
        prd:{
          host:'127.0.0.1',
          user: 'wearetheking',
          password:'Weare0917!',
          port:3306,
          database :'yiingdb'
        }
    }
 
module.exports=urlPath[bootenv];