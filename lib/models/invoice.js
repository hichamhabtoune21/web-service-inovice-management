const {DataTypes} = require("sequelize");
const sequelize = require('../connect').sequelize;
const Client = require('./client').Client;
const Invoice = sequelize.define("invoice", {
    ID_Invoice: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false
    },
    'Progressive number': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'Issuing date': {
      type: DataTypes.DATE,
    },
    'Business Name': {
      type: DataTypes.STRING,
    },
    Amount: {
        type: DataTypes.STRING,
    },
    'Payment type': {
        type: DataTypes.ENUM("Cash","Credit Card","Bnak Transfer"),
    },
 });
 Invoice.belongsTo(Client, {
    foreignKey: "ID_Client",
    targetKey: "ID_Client",
});
 exports.Invoice=Invoice;