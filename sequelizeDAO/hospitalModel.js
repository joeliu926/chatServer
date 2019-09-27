/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-12 10:40:31
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_hospital = sequelize.define('o_hospital', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100)
    }
    ,
    discript	: {
      type: DataTypes.STRING(300)
    }
    ,
    r_regionid	: {
      type: DataTypes.STRING(50)
    }
    ,
    logo	: {
      type: DataTypes.STRING(200)
    }
    ,
    location	: {
      type: DataTypes.STRING(300)
    }
    ,
    gps_x	: {
      type: DataTypes.FLOAT
    }
    ,
    gps_y	: {
      type: DataTypes.FLOAT
    }
    ,
    score	: {
      type: DataTypes.INTEGER
    }
    ,
    establishTime	: {
      type: DataTypes.DATE
    }
    ,
    classes	: {
      type: DataTypes.STRING(100)
    }
    ,
    nature	: {
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
  return o_hospital;
};
