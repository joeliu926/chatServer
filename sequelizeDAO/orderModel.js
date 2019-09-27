/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-26 19:35:16
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_order = sequelize.define('o_order', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    nickName: {
      type: DataTypes.STRING(100)
    }
    ,
    categoryids	: {
      type: DataTypes.STRING(400)
    }
    ,
    r_userid	: {
      type: DataTypes.STRING(50)
    }
    ,
    r_hospitalid	: {
      type: DataTypes.STRING(50)
    }
    ,
    r_doctorid	: {
      type: DataTypes.STRING(50)
    }
    ,
    phoneNumber	: {
      type: DataTypes.STRING(50)
    }
    ,
    message	: {
      type: DataTypes.STRING(300)
    }
    ,
    visitTime	: {
      type: DataTypes.DATE
    }
    ,
    status	: {
      type: DataTypes.INTEGER
    },
  
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_order;
};
