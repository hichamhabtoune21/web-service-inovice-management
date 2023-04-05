require('dotenv').config()
const app = require('./lib/app').app;
const db= require('./lib/connect');
db.connectToDb();

const port = process.env.PORT;

app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`)
});


exports.app=app;




