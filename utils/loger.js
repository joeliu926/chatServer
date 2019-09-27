/*
 * @Author: JoeLiu 
 * @Date: 2018-06-26 19:47:28 
 * @Last Modified by:   JoeLiu 
 * @Last Modified time: 2018-06-26 19:47:28 
 */

const log4js = require('log4js')
const path=require('path');
const logInfoPath=path.join(__dirname,'./../public/logs');
log4js.configure({
    appenders: {
        logConsole: {type: 'console'},
        webrequest: {
            type: 'dateFile',
            filename: `${logInfoPath}/webreq/`,
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 7,
            encoding: "utf-8",
            alwaysIncludePattern: true
        },
        interface: {
            type: 'dateFile',
            filename: `${logInfoPath}/interface/`,
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 7,
            encoding: "utf-8",
            alwaysIncludePattern: true
        },
        error: {
            type: 'dateFile',
            filename: `${logInfoPath}/error/`,
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 7,
            encoding: "utf-8",
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['logConsole', 'interface'], level: 'info' },
        webrequest: { appenders: ['logConsole', 'webrequest'], level: 'debug' },
        error: { appenders: ['logConsole', 'error'], level: 'error' }
    }
});
/**
 * 获取日志类型
 * @param {获取categories项} log_category_name 
 */
function logger(log_category_name){
    return log4js.getLogger(log_category_name||'default');
};
/**
 * 用于和express联合使用
 * @param {express app} app 
 * @param {日志类型项} logger 
 */
function useLogger(app, logger){
    app.use(log4js.connectLogger(logger || log4js.getLogger('webrequest'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//
    }))
};
module.exports={
    loger:logger,
    useLogger:useLogger
};
// 使用---
// const log4js= require('./utils/log4js');
// const webrequest = log4js.loger("webrequest");
// const errorlogger = log4js.loger('error');
// const interfacelogger = log4js.loger();
// var app = express();
// log4js.useLogger(app,webrequest);