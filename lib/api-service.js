const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
const db = require('./connect');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

async function init() {
    const updateInvoice = require('./schemas/updateInvoice.js').schema;
    const createInvoice = require('./schemas/createInvoice.js').schema;
    const idInvoice = require('./schemas/idInvoice.js').schema;

    const swaggerOptions = require('../docs/swagger').swaggerOptions;
    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    swaggerDocs.components = { schemas: { updateInvoice: updateInvoice, createInvoice: createInvoice, idInvoice: idInvoice } };

    const swaggerUiOptions = {
        customCss: '.swagger-ui .topbar { display: none }'
    };


    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));



    app.use(function (req, res, next) {
        res.setHeader("Content-Type", "application/json");
        next();
    });
    app.use(bodyParser.json()); //funzione middleware che viene richiamata ogni volta
    app.use(bodyParser.urlencoded({ extended: true }));



    //db.connectToDb();

}
function decodeBasic(credentials) {
    //console.log(user)
    const decodedUsername = Buffer.from(credentials.name, 'base64').toString();
    const decodedPassword = Buffer.from(credentials.pass, 'base64').toString();
    const user_object = {
        Email: decodedUsername,
        Password: decodedPassword
    }
    return user_object;
}
exports.init = init;
exports.app = app;
exports.Router = express.Router;
exports.decodeBasic = decodeBasic;



