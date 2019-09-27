/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-28 17:41:33
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_doctor = sequelize.define('o_doctor', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    r_hospitalid: {
      type: DataTypes.STRING(50)
    }
    ,
    name	: {
      type: DataTypes.STRING(100)
    }
    ,
    title	: {
      type: DataTypes.STRING(100)
    }
    ,
    status	: {
      type: DataTypes.INTEGER
    },
  
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_doctor;
};
