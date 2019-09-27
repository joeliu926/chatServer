/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-27 09:54:14
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var r_users_comment = sequelize.define('r_users_comment', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    type	: {
      type: DataTypes.INTEGER
    }
    ,
    r_usersid	: {
      type: DataTypes.STRING(50)
    }
    ,
    r_commentid	: {
      type: DataTypes.STRING(50)
    }
   ,

   score	: {
    type: DataTypes.DECIMAL
  }
 ,


 discript	: {
  type: DataTypes.STRING(300)
}
,
    status	: {
      type: DataTypes.INTEGER
    },
  
    createTime: {
      type: DataTypes.DATE
    }
  });
  return r_users_comment;
};
