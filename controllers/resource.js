/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:34:18 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-12 14:44:04
 */

'use strict';
const models = require('../sequelizeDAO');
const UUID = require('uuid');

function getResource(req, res, next) {
  models.o_resource
    .findOne({ where: { id: req.params.id } })
    .then(function (retObj) {
      res.json(retObj);
      return null;
    })
    .catch(next);
}

function getResources(req, res, next) {
  let pagesize = req.query.pageSize*1;
  let pageset =req.query.pageIndex>0?(req.query.pageIndex-1)*pagesize:0;
  models.o_resource
    .findAndCountAll({
      where:{r_id:req.query.id},
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

function postResource(req, res, cb) {

  let data = {
    id: UUID.v1(),
    type: req.body.type,
    originType: req.body.originType,
    classes:req.body.classes,
    size:req.body.size,
    r_id: req.body.r_id,
    name: req.body.name,
    url: req.body.url,
    status: 1
  };

  models.o_resource
    .create(data)
    .then(function (saved) {
   
       cb(data);
    })
}

function putResource(req, res, next) {
  let _id = req.body.id;
  let data = {
    type: req.body.type,
    originType: req.body.originType,
    classes:req.body.classes,
    size:req.body.size,
    r_id: req.body.r_id,
    name: req.body.name,
    url: req.body.url,
    status: 1
  };

  models.o_resource
    .update(data, { where: { id: _id } })
    .then(function () {
      res.json('Updated');
      return null;
    })
    .catch(next);
}

function deleteResource(req, res, next) {
  models.o_resource
    .destroy({ where: { id: id } })
    .then(function () {
      res.json('Deleted');
      return null;
    })
    .catch(next);
}

module.exports = {
  getResource,
  getResources,
  postResource,
  putResource,
  deleteResource,
};
