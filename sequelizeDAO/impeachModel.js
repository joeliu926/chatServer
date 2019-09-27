/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-26 19:39:02
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var o_impeach = sequelize.define('o_impeach', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    r_userid: {
      type: DataTypes.STRING(50)
    }
    ,
    r_commentid: {
      type: DataTypes.STRING(50)
    }
    ,
    r_doctorid: {
      type: DataTypes.STRING(50)
    }
    ,
    r_hospitalid: {
      type: DataTypes.STRING(50)
    }
    ,
    type	: {
      type: DataTypes.INTEGER
    }
    ,
    descript	: {
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
  return o_impeach;
};
