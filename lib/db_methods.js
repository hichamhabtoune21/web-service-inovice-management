const connect = require('./connect.js');
const sequelize = connect.sequelize;


function findAll(Table) {
    sequelize.sync().then(() => {

        Table.findAll().then(res => {
            console.log(res)
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error(error);
    })
};

exports.findAll = findAll;