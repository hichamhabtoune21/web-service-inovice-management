const {DataTypes} = require("sequelize");
const sequelize = require('../connect').sequelize;
const Client = sequelize.define("client", {
    ID_Client: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false
    },
    'VAT number': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
    },
    Surname: {
      type: DataTypes.STRING,
    },
    Phone: {
        type: DataTypes.STRING,
    },
    Address: {
        type: DataTypes.STRING,
    }
 });
 exports.Client=Client;