/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 12:02:12 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-06-25 17:15:29
 */

'use strict';
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
let config    = require(path.resolve(__dirname, '..')+'/config/mysqlconfig.js');
const db        = {};
let sequelize = new Sequelize(config.database, config.user, config.password, {
    'dialect': 'mysql',  
    'host': config.host,
    'port': config.port,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
    timestamps: false,
  }
});
 

  fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
