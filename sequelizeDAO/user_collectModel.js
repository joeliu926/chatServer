/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-26 19:44:52
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_users_collect = sequelize.define('o_users_collect', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER
    }
    ,
    r_hospitcalid	: {
      type: DataTypes.STRING(50)
    }
    ,
    r_hospicalcategoryid	: {
      type: DataTypes.STRING(50)
    }
    ,
    r_doctorid	: {
      type: DataTypes.STRING(50)
    }
    ,
    r_usersid	: {
      type: DataTypes.STRING(50)
    }
    ,
    status	: {
      type: DataTypes.INTEGER
    },
  
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_users_collect;
};
