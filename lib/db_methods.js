const connect = require('./connect.js');
const sequelize = connect.sequelize;
const { QueryTypes } = require('sequelize');
const reply = {};

function findAll(Table, user) {
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

function create(Table, record, user) {
    return sequelize.sync().then(() => {
        return Table.create(record).then(res => {
            console.log(res)
            return res;
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
            throw error;
        });

    }).catch((error) => {
        console.error('Unable to create record : ', error);
        throw error;
    });
}
function authenticate(Table, user) {
    const crypto = require('crypto')

    let hash = crypto.createHash('md5').update(user.Password).digest("hex")

    const result = sequelize.query(Table.findOne({ where: { Email: user.Email, Password: user.Password} }));
    return result;
}


exports.findAll = findAll;
exports.create = create;
