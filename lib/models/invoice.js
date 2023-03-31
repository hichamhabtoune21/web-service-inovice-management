const {DataTypes} = require("sequelize");
const sequelize = require('../connect').sequelize;
const Client = require('./client').Client;
const Invoice = sequelize.define("invoice", {
    ID_Invoice: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: true
    },
    'Progressive number': {
      type: DataTypes.STRING,
      allowNull: true,
    },
    'Issuing date': {
      type: DataTypes.DATE,
    },
    'Business name': {
      type: DataTypes.STRING,
    },
    Amount: {
        type: DataTypes.STRING,
    },
    'Payment type': {
        type: DataTypes.ENUM("Cash","Credit Card","Bank Transfer"),
    },
 });
 Invoice.belongsTo(Client, {
    foreignKey: "ID_Client",
    targetKey: "ID_Client",
});
 exports.Invoice=Invoice;