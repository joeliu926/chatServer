/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:34:18 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-28 18:22:25
 */

'use strict';
const models = require('../sequelizeDAO');
const UUID = require('uuid');

function getHospital(req, res, next) {

  models.o_hospital.hasMany(models.o_doctor, {
    foreignKey: 'r_hospitalid',
    targetKey: 'id'
  }); 
  
  models.o_hospital
    .findOne({ where: { id: req.params.id } ,
     include: [{
      model: models.o_doctor
    }]
    })
    .then(function (retObj) {
      res.json(retObj);
      return null;
    })
    .catch(next);
}

function getHospitals(req, res, next) {
  let pagesize = req.query.pageSize*1;
  let pageset =req.query.pageIndex>0?(req.query.pageIndex-1)*pagesize:0;
  // models.o_doctor.belongsToMany(models.o_hospital, {
  //   as: 'o_hospital', through: 'o_doctor',
  //   foreignKey: 'r_hospitalid',
  //   targetKey: 'id'
  // }); 

  models.o_hospital.hasMany(models.o_doctor, {
    foreignKey: 'r_hospitalid',
    targetKey: 'id'
  }); 

  // models.o_doctor.belongsTo(models.o_hospital, {
  //   foreignKey: 'id',
  //   targetKey: 'r_hospitalid'
  // }); 

  models.o_hospital
    .findAndCountAll({
      order: [['createTime', 'DESC']],
      offset: pageset, 
      limit: pagesize,
      include: [{
        model: models.o_doctor
      }]
    })
    .then(function (retObj) {
      res.json({ data: retObj });
      return null;
    })
    .catch(next);
}

function postHospital(req, res, next) {

  let data = {
    id: UUID.v1(),
    name:req.body.name,
    discript	: req.body.discript,
    r_regionid	: req.body.r_regionid,
    location	: req.body.location,
    gps_x	: req.body.gps_x,
    gps_y	: req.body.gps_y,
    score	: req.body.score,
    establishTime	: req.body.establishTime,
    classes	: req.body.classes,
    nature	: req.body.nature,
    status	: req.body.status
  };

  models.o_hospital
    .create(data)
    .then(function (saved) {
      res.json(saved);
      return null;
    })
    .catch(next);
}

function putHospital(req, res, next) {
  let _id = req.body.id;
  let data = {
    name:req.body.name
    ,
    discript	: req.body.discript
    ,
    r_regionid	: req.body.r_regionid
    ,
    location	: req.body.location
    ,
    gps_x	: req.body.gps_x
    ,
    gps_y	: req.body.gps_y
    ,
    score	: req.body.score
    ,
    establishTime	: req.body.establishTime
    ,
    classes	: req.body.classes
    ,
    nature	: req.body.nature
    ,
    status	: req.body.status
  };

  models.o_hospital
    .update(data, { where: { id: _id } })
    .then(function () {
      res.json('Updated');
      return null;
    })
    .catch(next);
}

function deleteHospital(req, res, next) {
  models.o_hospital
    .destroy({ where: { id: id } })
    .then(function () {
      res.json('Deleted');
      return null;
    })
    .catch(next);
}

module.exports = {
  getHospital,
  getHospitals,
  postHospital,
  putHospital,
  deleteHospital,
};
