const {DataTypes} = require("sequelize");
const sequelize = require('../connect').sequelize;
const Permission = sequelize.define("permission", {
    Permission: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
 });
 exports.Permission=Permission;