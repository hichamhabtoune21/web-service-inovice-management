const connect = require('./connect.js');
const sequelize = connect.sequelize;
const { QueryTypes } = require('sequelize');
const { User } = require('./models/user.js');
const { Permission_to_Role } = require('./models/permission_to_Role.js');

const reply = {};

function findAll(Table) {
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

function create(Table, record, user) {
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
function permissions(user){
    const role=userInfo(user);
    return sequelize.sync().then(()=>{
        return Permission_to_Role.findAll({
            where:{
                Role: role,
            },
        }).then(res=>{
            if(res){
                console.log(rest);
                return res;
            }else{
                return false;
            }
        })
    })
}
function auth(Table_User, user) {
    const crypto = require('crypto')

    let hashed_password = crypto.createHash('md5').update(user.Password).digest("hex") 
    return sequelize.sync().then(() => {

        return Table_User.findOne({
            where: {
                Email : user.Email,
                Password: hashed_password,
            }
        }).then(res => {
            if(res){
                return true;
            }else{
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

function userInfo(Table_User, user) {
    const crypto = require('crypto')

    let hashed_password = crypto.createHash('md5').update(user.Password).digest("hex") 
    return sequelize.sync().then(() => {

        return Table_User.findOne({
            where: {
                Email : user.Email,
                Password: hashed_password,
            }
        }).then(res => {
            if(res){
                return res;
            }else{
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
