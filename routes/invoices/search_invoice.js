const router = require('express').Router();
const service = require('../../lib/api-service');
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const Ajv = require("ajv");
const ajv = new Ajv();

const id_invoice_schema = require('../../lib/schemas/idInvoice').schema;
const validate = ajv.compile(id_invoice_schema);
const auth = require('basic-auth');

router.post("/", async function (req, res) {
    if (req.headers.authorization == null) {
        console.log(req.headers.authorization);
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
                const invoice = await db_methods.find(Invoice, req.body.ID_Invoice, user);
                if (invoice == 403) {
                    res.sendStatus(403);
                } else {
                    res.status(200).send(invoice);
                }
            }
        } else {
            res.sendStatus(401);
        }
    }
});

/**
* @swagger
* /invoices/search:
*   post:
*     summary: Get an invoice by ID
*     description: Returns the invoice with the specified ID
*     tags: [Invoices]
*     parameters:
*       - in: header
*         name: Authorization
*         type: string
*         required: true
*         description: Basic Authentication header with email and password credentials
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/idInvoice'
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Invoice'
*       400:
*         description: Bad request, invalid input format
*       401:
*         description: Unauthorized, missing or invalid credentials
*       403:
*         description: Forbidden, access to the specified invoice is not allowed
*       404:
*         description: Not found, the specified invoice does not exist
*/


module.exports = router;