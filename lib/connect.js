const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'crud',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
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