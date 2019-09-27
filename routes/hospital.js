/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:43:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-27 11:20:02
 */

'use strict';

const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital');

router.route('/:id')
  .get(hospitalController.getHospital)
  .delete(hospitalController.deleteHospital);

router.route('/')
  .get(hospitalController.getHospitals)
  .post(hospitalController.postHospital)
  .put(hospitalController.putHospital);

module.exports = router;
