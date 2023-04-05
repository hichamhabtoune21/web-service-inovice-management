const router = require('express').Router();
const service = require('../../lib/api-service');
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const Ajv = require("ajv");
const ajv = new Ajv();

const id_invoice_schema = require('../../lib/schemas/id_invoice_schema').schema;
const validate = ajv.compile(id_invoice_schema);
const auth = require('basic-auth');

router.post("/", async function (req, res) {
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
                console.log(validate.errors);
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

module.exports = router;