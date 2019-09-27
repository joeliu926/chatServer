/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-12 15:20:32
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_region = sequelize.define('o_region', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100)
    }
    ,
    deep:{
      type: DataTypes.INTEGER
    },
    pid: {
      type: DataTypes.STRING(50)
    }
    ,
    discript: {
      type: DataTypes.STRING(300)
    }
    ,
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_region;
};
