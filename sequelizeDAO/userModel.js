/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-26 14:59:38
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('o_users', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    wxa_openid: {
      type: DataTypes.STRING(50)
    }
    ,
    wxa_unionid: {
      type: DataTypes.STRING(50)
    }
    ,
    wxa_avatarUrl: {
      type: DataTypes.STRING(300)
    }
    ,
    wxa_city: {
      type: DataTypes.STRING(100)
    }
    ,
    wxa_province: {
      type: DataTypes.STRING(100)
    }
    ,
    wxa_gender: {
      type: DataTypes.INTEGER
    }
    ,
    wxa_nickName: {
      type: DataTypes.STRING(100)
    }
    ,
    wxa_language: {
      type: DataTypes.STRING(50)
    }
    ,
    name: {
      type: DataTypes.STRING(100)
    }
    ,
    phoneNum: {
      type: DataTypes.STRING(100)
    }
    ,
    sex: {
      type: DataTypes.INTEGER
    }
    ,
    birthday: {
      type: DataTypes.DATE
    }
    ,
    signature: {
      type: DataTypes.STRING(200)
    }
    ,
    status: {
      type: DataTypes.INTEGER
    }
    ,
    backField: {
      type: DataTypes.STRING(200)
    }
    ,
    createTime: {
      type: DataTypes.DATE
    }
  });
  return users;
};
