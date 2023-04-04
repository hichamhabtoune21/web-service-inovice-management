const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
const db = require('./connect');
function init() {
    app.use(bodyParser.json()); //funzione middleware che viene richiamata ogni volta
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function (req, res, next) {
        res.setHeader("Content-Type", "application/json");
        next();
    });
    db.connectToDb();

}
function decodeBasic(req) {
    const user = req.headers.authorization;
    let basic = user.replace('Basic ', '');
    console.log(user)
    basic = Buffer.from(basic, 'base64').toString('utf8')

    const credentials = basic.split(":");
    const user_object = {
        Email: credentials[0],
        Password: credentials[1]
    }
    return user_object;
}
exports.init = init;
exports.app = app;
exports.Router = express.Router;
exports.decodeBasic = decodeBasic;



