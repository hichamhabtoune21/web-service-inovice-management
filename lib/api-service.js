const express = require('express');
const app = express();  
const router = express.Router();
var bodyParser = require('body-parser');
const db = require('./connect');
async function init() {
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



