const {DataTypes} = require("sequelize");
const sequelize = require('../connect').sequelize;
const Role = sequelize.define("role", {
    Role: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
 });
 exports.Role=Role;