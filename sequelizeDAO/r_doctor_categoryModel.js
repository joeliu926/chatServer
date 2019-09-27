/*
 * @Author: JoeLiu 
 * @Date: 2018-04-26 14:31:09 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-04-28 09:48:12
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var r_doctor_category = sequelize.define('r_doctor_category', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    r_doctorid	: {
      type: DataTypes.STRING(50)
    },
    r_categoryid	: {
      type: DataTypes.STRING(50)
    },
    status	: {
      type: DataTypes.INTEGER
    },
    createTime: {
      type: DataTypes.DATE
    }
  });
  return r_doctor_category;
};
