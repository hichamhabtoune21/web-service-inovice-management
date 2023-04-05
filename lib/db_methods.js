const connect = require('./connect.js');
const sequelize = connect.sequelize;
const { QueryTypes, where } = require('sequelize');
const User = require('./models/user').User;
const Invoice = require('./models/invoice.js').Invoice;

const Permission_to_Role = require('./models/permission_to_role').Permission_to_Role;

const reply = {};

async function findAll(Table, user) {
    const permission = JSON.parse(await permissions(user));
    let authorized = false;
    let i = 0;
    while (i < permission.length) {
        //console.log(permission[i].Permission+);
        if (permission[i].Permission === 'READ') {
            authorized = true;
            break;
        }
        i++;
    }
    if (!authorized) {
        return 403;
    }
    return sequelize.sync().then(() => {

        return Table.findAll().then(res => {
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

async function find(Table, id, user) {
    const permission = JSON.parse(await permissions(user));
    let authorized = false;
    let i = 0;
    while (i < permission.length) {
        //console.log(permission[i].Permission+);
        if (permission[i].Permission === 'READ') {
            authorized = true;
            break;
        }
        i++;
    }
    if (!authorized) {
        return 403;
    }

    return sequelize.sync().then(() => {
        return Table.findByPk(id).then(res => {
            return JSON.stringify(res);
        }).catch((error) => {
            console.error('Invoice doesn\'t exist: ', error);
            throw error;
        });
    }).catch((error) => {
        console.error(error);
        throw error;
    });
}


async function removeInvoice(id, user) {
    const permission = JSON.parse(await permissions(user));
    let authorized = false;
    let i = 0;
    while (i < permission.length) {
        //console.log(permission[i].Permission+);
        if (permission[i].Permission === 'DELETE') {
            authorized = true;
            break;
        }
        i++;
    }
    if (!authorized) {
        return 403;
    }
    return sequelize.sync().then(() => {
        return Invoice.destroy({
            where: {
                ID_Invoice: id,
            },
        }).then(res => {
            return JSON.stringify(res);
        }).catch((error) => {
            console.error('Invoice doesn\'t exist: ', error);
            throw error;
        });
    }).catch((error) => {
        console.error(error);
        throw error;
    });
}

async function create(Table, record, user) {
    const permission = JSON.parse(await permissions(user));
    let authorized = false;
    let i = 0;
    while (i < permission.length) {
        //console.log(permission[i].Permission+);
        if (permission[i].Permission === 'CREATE') {
            authorized = true;
            break;
        }
        i++;
    }
    if (!authorized) {
        return 403;
    }
    return sequelize.sync().then(() => {
        return Table.create(record).then(res => {
            //console.log(res)
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

async function permissions(user) {
    //const role = await userInfo(user).dataValues.Role;
    const data = JSON.parse(await userInfo(user))
    return sequelize.sync().then(() => {
        return Permission_to_Role.findAll({
            where: {
                Role: data.Role,
            },
            attributes: ["Permission"],
            raw: true,

        }
        ).then(res => {
            if (res) {
                //console.log(res);
                return JSON.stringify(res);
            } else {
                return false;
            }
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
            return error;
        });

    }).catch((error) => {
        console.error(error);
    });
}

function auth(user) {
    const crypto = require('crypto')

    let hashed_password = crypto.createHash('md5').update(user.Password).digest("hex")
    return sequelize.sync().then(() => {

        return User.findOne({
            where: {
                Email: user.Email,
                Password: hashed_password,
            }
        }).then(res => {
            //console.log(res);
            if (res === null) {
                return false;
            } else {
                return true;
            }
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
            return error;
        });

    }).catch((error) => {
        console.error(error);
    });
}

function userInfo(user) {
    const crypto = require('crypto')

    let hashed_password = crypto.createHash('md5').update(user.Password).digest("hex")
    return sequelize.sync().then(() => {

        return User.findOne({
            where: {
                Email: user.Email,
                Password: hashed_password,
            },
            raw: true,
        }).then(res => {
            if (res) {
                return JSON.stringify(res);
            } else {
                return false;
            }
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
            return error;
        });

    }).catch((error) => {
        console.error(error);
    });
}


exports.findAll = findAll;
exports.create = create;
exports.auth = auth;
exports.permissions = permissions;
exports.find = find;
exports.removeInvoice = removeInvoice;

