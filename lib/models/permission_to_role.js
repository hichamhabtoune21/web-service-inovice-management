const { DataTypes } = require("sequelize");
const sequelize = require('../connect').sequelize;

const Permission = require('./permission').Permission;
const Role = require('./role').Role;

const Permission_to_Role = sequelize.define("permission_to_role");
Permission_to_Role.removeAttribute('id');

Permission_to_Role.belongsTo(Permission,{
    foreignKey: 'Permission',
    targetKey: 'Permission'
});

Permission_to_Role.belongsTo(Role,{
    foreignKey: 'Role',
    targetKey: 'Role'
});

exports.Permission_to_Role=Permission_to_Role;
