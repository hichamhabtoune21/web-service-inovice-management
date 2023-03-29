const connect = require('./connect');
const User = require('./models/user.js').User;
const Role = require('./models/role.js').Role;
const Invoice = require('./models/invoice.js').Invoice;
const methods=require('./db_methods');


const User_Manage_Client = require('./models/user_manage_client.js').User_Manage_Client;



connect.connectToDb();
console.log(JSON.stringify(methods.findAll(Role)));

const sequelize = connect.sequelize;
