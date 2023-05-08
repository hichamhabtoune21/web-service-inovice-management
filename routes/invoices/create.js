const router = require('express').Router();
const service = require('../../lib/api-service');
const Ajv = require("ajv");
const ajv = new Ajv();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const invoice_schema = require('../../lib/schemas/createInvoice').schema;
const validate = ajv.compile(invoice_schema);
const auth = require('basic-auth');

router.put("/", async function (req, res) {
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
        //console.log(validate.errors);
        res.status(400).send(validate.errors);
      }
      else {
        const result = await db_methods.create(Invoice, req.body, user);
        if (result == 403 || result==201) {
          res.sendStatus(result);
        } else
        res.status(400).send(result);
      }
    }
    else {
      res.sendStatus(401);
    }
  }

});
/**
* @swagger
* /invoices/create:
*   put:
*     summary: Create invoice
*     description: Creates a new invoice in the database with the provided JSON object
*     tags: [Invoices]
 *     parameters:
 *       - in: body
 *         name: invoice
 *         description: 
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/createInvoice'
*     responses:
*       201:
*         description: Created
*       400:
*         description: Bad request
*       401:
*         description: Unauthorized
*       403:
*         description: Forbidden
*/

module.exports = router;