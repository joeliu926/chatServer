/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-26 18:18:54
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_category = sequelize.define('o_category', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100)
    }
    ,
    pid	: {
      type: DataTypes.STRING(50)
    },
    discript	: {
      type: DataTypes.STRING(300)
    },
    status	: {
      type: DataTypes.INTEGER
    },
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_category;
};
