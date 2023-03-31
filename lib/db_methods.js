const connect = require('./connect.js');
const sequelize = connect.sequelize;
const reply = {};

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

function create(Table, record) {
    return sequelize.sync().then(() => {
        return Table.create(record).then(res => {
            console.log(res)
            return res;
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
            throw error;
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
        throw error;
    });
}

exports.findAll = findAll;
exports.create = create;