const api = require('../../lib/api-service');
const router = api.Router();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;

router.get("/", async function (req, res) {
  try {
    const invoices = await db_methods.findAll(Invoice);
    res.send(invoices);
  } catch (error) {
    console.error('Failed to retrieve data : ', error);
  }
});

router.post("/create", async function (req, res) {
  try {
    //db_methods.Create(Invoice,req);
    console.log(req.body);
    res.send({text: 'success'})
  } catch (error) {
    console.error('Failed to retrieve data : ', error);
  }
});

module.exports = router;
