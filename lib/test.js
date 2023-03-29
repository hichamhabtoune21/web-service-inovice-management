const connect = require('./connect');
const User = require('./models/user.js').User;
const Role = require('./models/role.js').Role;
const Invoice = require('./models/invoice.js').Invoice;

const User_Manage_Client = require('./models/user_manage_client.js').User_Manage_Client;



connect.connectToDb();

const sequelize = connect.sequelize;

sequelize.sync().then(() => {

    Invoice.findAll().then(res => {
        console.log(JSON.stringify(res.map(item => item.get())));
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

}).catch((error) => {
    console.error(error);
})