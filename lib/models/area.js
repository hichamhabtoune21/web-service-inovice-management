const {DataTypes} = require("sequelize");
const sequelize = require('../connect').sequelize;
const Area = sequelize.define("area", {
    Area: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
 });
 exports.Area=Area;