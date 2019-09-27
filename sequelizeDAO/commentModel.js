/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-05-12 17:25:35
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_comment = sequelize.define('o_comment', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER
    }
    ,
    classify: {
      type: DataTypes.INTEGER
    }
    ,
    r_hospitalid	: {
      type: DataTypes.STRING(50)
    }
    ,
    r_usersid	: {
      type: DataTypes.STRING(50)
    }
 
    ,
    comment	: {
      type: DataTypes.STRING(300)
    }
    ,
    userName	: {
      type: DataTypes.STRING(100)
    }
    ,
    score	: {
      type: DataTypes.DECIMAL
    }
    ,
    score_xiaogu	: {
      type: DataTypes.DECIMAL
    }
    ,
    score_fuwu	: {
      type: DataTypes.DECIMAL
    }
    ,
    score_yisheng	: {
      type: DataTypes.DECIMAL
    }
    ,
    score_huanjing	: {
      type: DataTypes.DECIMAL
    }
    ,
    pid:{
      type: DataTypes.STRING(50)
    },
    status	: {
      type: DataTypes.INTEGER
    },
  
    createTime: {
      type: DataTypes.DATE
    }
  });
  return o_comment;
};
