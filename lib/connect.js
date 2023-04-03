require('dotenv').config()

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST_DATABASE,
        dialect: process.env.DBMS,
        define: {
            timestamps: false,
            freezeTableName: true //prevent sequelize from pluralizing table names
        },
    },

);

function connectToDb() {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
}

exports.connectToDb = connectToDb;
exports.sequelize = sequelize;