const api = require('../../lib/api-service');
const router = api.Router();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;

const Ajv = require("ajv")
const ajv = new Ajv();
const invoice_schema = require('../../lib/schemas/invoice-schema').schema;

const validate = ajv.compile(invoice_schema);

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
    const valid = validate(req.body);
    if (!valid) {
      console.log(validate.errors);
      res.send(validate.errors);
    }
    else {
      await db_methods.create(Invoice, req.body);
      res.send({ text: 'success' })
    }
    console.log(req.body);
  } catch (error) {
    console.error('Failed to retrieve data : ', error);
  }
});

module.exports = router;
