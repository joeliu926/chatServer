/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:34:18 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-28 10:54:16
 */

'use strict';
const models = require('../sequelizeDAO');
const UUID = require('uuid');

function getDoctor(req, res, next) {
  models.o_doctor
    .findOne({ where: { id: req.params.id } })
    .then(function (retObj) {
      res.json(retObj);
      return null;
    })
    .catch(next);
}

function getDoctors(req, res, next) {
  let pagesize = req.query.pageSize*1;
  let pageset =req.query.pageIndex>0?(req.query.pageIndex-1)*pagesize:0;
  models.o_doctor
    .findAndCountAll({
      order: [['createTime', 'DESC']],
      offset: pageset, 
      limit: pagesize
    })
    .then(function (retObj) {
      res.json({ data: retObj });
      return null;
    })
    .catch(next);
}

function postDoctor(req, res, next) {

  let data = {
    id: UUID.v1(),
    r_hospitalid: req.body.r_hospitalid,
    name	: req.body.name,
    title	:  req.body.title,
    status	: 1
  };

  models.o_doctor
    .create(data)
    .then(function (saved) {
      res.json(saved);
      return null;
    })
    .catch(next);
}

function putDoctor(req, res, next) {
  let _id = req.body.id;
  let data = {
    r_hospitalid: req.body.r_hospitalid,
    name	: req.body.name,
    title	:  req.body.title,
    status	:  req.body.status
  };

  models.o_doctor
    .update(data, { where: { id: _id } })
    .then(function () {
      res.json('Updated');
      return null;
    })
    .catch(next);
}

function deleteDoctor(req, res, next) {
  models.o_doctor
    .destroy({ where: { id: id } })
    .then(function () {
      res.json('Deleted');
      return null;
    })
    .catch(next);
}

module.exports = {
  getDoctor,
  getDoctors,
  postDoctor,
  putDoctor,
  deleteDoctor,
};
