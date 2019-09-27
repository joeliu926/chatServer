/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-27 09:56:13
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var r_hospital_category = sequelize.define('r_hospital_category', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    r_hospitalid: {
      type: DataTypes.STRING(50)
    }
    ,
    r_categoryid	: {
      type: DataTypes.STRING(50)
    }
    ,
    title	: {
      type: DataTypes.STRING(100)
    }
    ,
    descript	: {
      type: DataTypes.STRING(300)
    }
    ,
    price	: {
      type: DataTypes.DECIMAL
    }
    ,
    score	: {
      type: DataTypes.DECIMAL
    }
    ,
    status	: {
      type: DataTypes.INTEGER
    },
  
    createTime: {
      type: DataTypes.DATE
    }
  });
  return r_hospital_category;
};
