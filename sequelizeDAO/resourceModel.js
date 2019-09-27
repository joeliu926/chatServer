/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-07 14:52:18
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_resource = sequelize.define('o_resource', {
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
    classes: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    r_id		: {
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
  return o_resource;
};
