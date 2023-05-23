const User = require('./user.js').User;
const Role = require('./role.js').Role;
const Invoice = require('./invoice.js').Invoice;
const Client = require('./client.js').Invoice;
const Permission = require('./permission.js').Permission;
const Permission_to_Role = require('./permission_to_role.js').Permission_to_Role;
const Area = require('./area.js').Area;



const User_Manage_Client = require('./user_manage_client.js');

exports.User = User;
exports.Role = Role;
exports.Invoice = Invoice;
exports.Permission = Permission;
exports.Area = Area;
exports.Permission_to_Role = Permission_to_Role;


exports.Client = Client;
exports.User_Manage_Client = User_Manage_Client;

