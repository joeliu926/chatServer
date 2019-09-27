/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-26 19:32:05
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_hot_category = sequelize.define('o_hot_category', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    r_categoryid: {
      type: DataTypes.STRING(50)
    }
    ,
    sortid	: {
      type: DataTypes.INTEGER
    }
    ,
    status	: {
      type: DataTypes.INTEGER
    },
  
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_hot_category;
};
