const router = require('express').Router();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const Ajv = require("ajv");
const ajv = new Ajv();

const id_invoice_schema = require('../../lib/schemas/idInvoice').schema;
const validate = ajv.compile(id_invoice_schema);
const auth = require('basic-auth');

router.delete("/", async function (req, res) {
    if (req.headers.authorization == null) {
        res.sendStatus(400)
    } else {
        const credentials = auth(req);
        const user = {
            Email: credentials.name,
            Password: credentials.pass
        };
        const valid = validate(req.body);
        if (await db_methods.auth(user)) {
            if (!valid) {
                //console.log(validate.errors);
                res.sendStatus(400);
            }
            else {
                const result = await db_methods.removeInvoice(req.body.ID_Invoice, user);
                if (result == 403 || result==200) {
                    res.sendStatus(result);
                  } else{
                    res.status(400).send(result);
                }
            }
        } else {
            res.sendStatus(401);

        }
    }
});

/**
 * @swagger
 * /invoices:
 *   delete:
 *     summary: Delete invoice endpoint
 *     description: Deletes the invoice with the specified ID from the database
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Basic Authentication header with email and password credentials
 *       - in: body
 *         name: invoice
 *         description: ID of the invoice to be deleted
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/idInvoice'
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