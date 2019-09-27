/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-07 14:16:56
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_hospital_r = sequelize.define('o_hospital_resource', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    type	: {
      type: DataTypes.INTEGER
    },
    originType: {
      type: DataTypes.INTEGER
    },
    r_hospitcalid		: {
      type: DataTypes.STRING(50)
    },
    name		: {
      type: DataTypes.STRING(100)
    },url		: {
      type: DataTypes.STRING(300)
    },
    status	: {
      type: DataTypes.INTEGER
    },
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_hospital_r;
};
