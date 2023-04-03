const router = require('express').Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const invoice_schema = require('../../lib/schemas/invoice_schema').schema;
const validate = ajv.compile(invoice_schema);

router.post("/", async function (req, res) {
    const valid = validate(req.body);
    if (!valid) {
      console.log(validate.errors);
      res.send(validate.errors);
    }
    else {
      await db_methods.create(Invoice, req.body,req.body.User);
      res.send({ text: 'success' })
    }
  
});
module.exports=router;