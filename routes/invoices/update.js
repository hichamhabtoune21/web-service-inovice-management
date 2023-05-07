const router = require('express').Router();
const service = require('../../lib/api-service');
const Ajv = require("ajv");
const ajv = new Ajv();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const invoice_schema = require('../../lib/schemas/updateInvoice').schema;
const validate = ajv.compile(invoice_schema);
const auth = require('basic-auth');


router.patch("/", async function (req, res) {
  if (req.headers.authorization == null) {
    res.sendStatus(400);
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
        res.status(400).send(validate.errors);
      }
      else {
        const result = await db_methods.update(Invoice, req.body, user);
        if (result == 403 || result == 200) {
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
 * /invoices/update:
 *   patch:
 *     summary: Update invoice endpoint
 *     description: Updates an invoice in the database with the provided JSON object
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Basic Authentication header with email and password credentials
 *     requestBody:
 *       description: JSON object containing the invoice data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateInvoice'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */


module.exports = router;
