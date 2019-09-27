/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:43:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-07 16:41:39
 */

'use strict';

const express = require('express');
const router = express.Router();
const resouceController = require('../controllers/resource');

router.route('/:id')
  .get(resouceController.getResource)
  .delete(resouceController.deleteResource);

router.route('/')
  .get(resouceController.getResources)
  .post(resouceController.postResource)
  .put(resouceController.putResource);

module.exports = router;
