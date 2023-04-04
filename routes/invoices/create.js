const router = require('express').Router();
const service = require('../../lib/api-service');
const Ajv = require("ajv");
const ajv = new Ajv();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const invoice_schema = require('../../lib/schemas/invoice_schema').schema;
const validate = ajv.compile(invoice_schema);

router.post("/", async function (req, res) {
  const user = service.decodeBasic(req)
  const valid = validate(req.body);
  
  if (await db_methods.auth(user)) {
    if (!valid) {
      console.log(validate.errors);
      res.send(validate.errors);
    }
    else {
      await db_methods.create(Invoice, req.body, user);
      res.send(201);
    }
  }
  else {
    res.sendStatus(401);
  }

});
module.exports = router;