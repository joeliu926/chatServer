/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:43:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-06-28 15:12:52
 */

'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.route('/:id')
  .get(usersController.getUser);

router.route('/')
  .post(usersController.postUser);

router.route('/history/:id')
  .get(usersController.getHistory);

  router.route('/historycount/:id')
  .get(usersController.getHistoryCount);

router.route('/history/:id/:rid')
  .get(usersController.getHistoryByDBID);

router.route('/history')
  .post(usersController.postHistory)
  .put(usersController.updateHistory);


module.exports = router;
