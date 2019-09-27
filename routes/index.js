/*
 * @Author: ZXY 
 * @Date: 2018-03-20 13:41:02 
 * @Last Modified by:   ZXY 
 * @Last Modified time: 2018-03-20 13:41:02 
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
