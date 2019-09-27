/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:43:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-28 10:48:37
 */

'use strict';

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor');

router.route('/:id')
  .get(doctorController.getDoctor)
  .delete(doctorController.deleteDoctor);

router.route('/')
  .get(doctorController.getDoctors)
  .post(doctorController.postDoctor)
  .put(doctorController.putDoctor);

module.exports = router;
