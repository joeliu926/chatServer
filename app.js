/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 10:41:26 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-10 19:19:47
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var allowOriginConfig=require('./config/allowOriginConfig');
var routeConfig=require("./config/routeConfig");
var taskList = require("./taskService/bin");
const log4js= require('./utils/loger');
const webrequest = log4js.loger("webrequest");
const errorlogger = log4js.loger('error');

var app = express();
log4js.useLogger(app,webrequest);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowOriginConfig);

app.use(session({
    name:"aiychao",
    secret: 'sessiontest',
    resave: true,
    saveUninitialized:true
}));

/**
 * 请求全局过滤
 */
app.use(function(req, res, next) {
  next();
});

routeConfig(app);

//任务计划
taskList.launch();
/**
 * 页面不存在
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  //console.log(err);
  errorlogger.error(req.method,req.url,err.status);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  errorlogger.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
