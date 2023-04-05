const router = require('express').Router();
const service = require('../../lib/api-service');
const Ajv = require("ajv");
const ajv = new Ajv();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const invoice_schema = require('../../lib/schemas/invoice_schema').schema;
const validate = ajv.compile(invoice_schema);
const auth = require('basic-auth');

router.post("/", async function (req, res) {
  if (req.headers.authorization == null) {
    res.sendStatus(400)
  }
  else {
    const credentials = auth(req);
    const user = {
        Email: credentials.name,
        Password: credentials.pass
    };
    const valid = validate(req.body);

    if (await db_methods.auth(user)) {
      if (!valid) {
        console.log(validate.errors);
        res.status(400).send(validate.errors);
      }
      else {
        const result = await db_methods.create(Invoice, req.body, user);
        if (result == 403) {
          res.sendStatus(403);
        }else
        res.sendStatus(201);
      }
    }
    else {
      res.sendStatus(401);
    }
  }

});
module.exports = router;