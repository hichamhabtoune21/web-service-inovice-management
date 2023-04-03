const router = require('express').Router();
const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const Ajv = require("ajv");
const ajv = new Ajv();

const id_invoice_schema = require('../../lib/schemas/id_invoice_schema').schema;
const validate = ajv.compile(id_invoice_schema);
router.post("/", async function (req, res) {
    const valid = validate(req.body);
    if (await db_methods.auth(req.body.User)) {
        if (!valid) {
            console.log(validate.errors);
            res.send(validate.errors);
        }
        else {
            const invoice = await db_methods.find(Invoice, req.body.ID_Invoice,req.body.User);
            //console.log(db_methods);
            res.send(invoice);
        }
    }else {
    res.send({ authenticated: false });

}
});

module.exports = router;