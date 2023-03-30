const connect = require('./connect');

const User = require('./models/user.js').User;
const Role = require('./models/role.js').Role;
const Invoice = require('./models/invoice.js').Invoice;
const methods = require('./db_methods');


const User_Manage_Client = require('./models/user_manage_client.js').User_Manage_Client;
const sequelize = connect.sequelize;

sequelize.sync().then(() => {

    User.findAll().then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});
