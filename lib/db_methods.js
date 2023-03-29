const connect = require('./connect.js');
const sequelize = connect.sequelize;
const reply={};

function findAll(Table) {
    return sequelize.sync().then(() => {

        return Table.findAll().then(res => {
            //console.log(JSON.stringify(res));
            return JSON.stringify(res, null, 2);
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
            throw error;
        });

    }).catch((error) => {
        console.error(error);
        throw error;
    })
};

exports.findAll = findAll;