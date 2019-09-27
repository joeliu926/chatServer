/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:43:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-13 11:20:58
 */

'use strict';

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

router.route('/config/:name')
  .get(apiController.getConfig);

router.route('/config')
  .post(apiController.setConfig);

router.route('/setuserstatus')
  .post(apiController.setstatus);

module.exports = router;
