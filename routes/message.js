/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:43:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-06-27 18:43:38
 */

'use strict';

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');

router.route('/')
  .get(messageController.getMessage);

router.route('/')
  .post(messageController.postMessage);

module.exports = router;
