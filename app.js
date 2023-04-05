require('dotenv').config()
const api = require('./lib/api-service');
const db= require('./lib/connect');
//db.connectToDb();
const app=api.app;
api.init();

const port = process.env.PORT;

const health = require("./routes/health");
const invoices = require("./routes/invoices/main");
const listUsers = require("./routes/users/list");

app.use("/health",health);
app.use("/",health);
app.use("/invoices",invoices);
app.use("/users",listUsers);


exports.app=app;


