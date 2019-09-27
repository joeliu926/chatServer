/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-07 14:16:44
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_article_resource = sequelize.define('o_article_resource', {
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
    r_acticleid		: {
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
  return o_article_resource;
};
