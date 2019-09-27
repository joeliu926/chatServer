/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 10:39:57 
 * @Last Modified by:   JoeLiu 
 * @Last Modified time: 2018-06-25 10:39:57 
 */


function resHeader(req, res, next){
   // console.log("------------------------------",req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
    res.header("XDomainRequestAllowed", "true");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}
module.exports = resHeader;