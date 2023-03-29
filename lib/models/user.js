const {DataTypes} = require("sequelize");
const sequelize = require('../connect').sequelize;
const Role = require('./role').Role;
const User = sequelize.define("user", {
    ID_User: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
    },
    Username: {
      type: DataTypes.STRING,
    },
    Name: {
        type: DataTypes.STRING,
    },
    Surname: {
        type: DataTypes.STRING,
    },
 });
 User.belongsTo(Role,{
    foreignKey: 'Role',
    sourceKey: 'Role'
 });
 exports.User=User;