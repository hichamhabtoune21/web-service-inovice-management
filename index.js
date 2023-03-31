const api = require('./lib/api-service');
const app=api.app;
api.init();
const db=require('./lib/connect');
db.connectToDb();
const port = 3000;

const health = require("./routes/health").router;
const listInvoices = require("./routes/invoices/list");
const listUsers = require("./routes/users/list");

app.use("/health",health);
app.use("/",health);
app.use("/invoices",listInvoices);
app.use("/users",listUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});




