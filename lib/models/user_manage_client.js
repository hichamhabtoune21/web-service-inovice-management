const { DataTypes } = require("sequelize");
const sequelize = require('../connect').sequelize;

const User = require('./user').User;
const Client = require('./client').Client;

const User_Manage_Client = sequelize.define("user_manage_client");
User_Manage_Client.removeAttribute('id');
User_Manage_Client.belongsTo(User, {
    foreignKey: 'ID_User',
    sourceKey: 'ID_User'
});
User_Manage_Client.belongsTo(Client, {
    foreignKey: 'ID_Client',
    sourceKey: 'ID_Client'
});
exports.User_Manage_Client = User_Manage_Client;