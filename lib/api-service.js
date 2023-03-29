const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');

function init(){
    app.use(bodyParser.json()); //funzione middleware che viene richiamata ogni volta
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function(req, res, next) {
        res.setHeader("Content-Type", "application/json");
        next();
    });
}

exports.init = init;
exports.app = app;
exports.Router = express.Router;



