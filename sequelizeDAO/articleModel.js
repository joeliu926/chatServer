/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-26 18:14:39
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_article = sequelize.define('o_article', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER
    }
    ,
    title	: {
      type: DataTypes.STRING(200)
    }
    ,
    content	: {
      type: DataTypes.TEXT
    }
    ,
    r_userid	: {
      type: DataTypes.STRING(50)
    }
    ,
    parentid	: {
      type: DataTypes.STRING(50)
    }
    ,
    praiseCount	: {
      type: DataTypes.INTEGER
    }
    ,
    browseCount	: {
      type: DataTypes.INTEGER
    }
    ,
    answerCount	: {
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
  return o_article;
};
