const router = require('express').Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const db_methods = require('../../lib/db_methods');
const User = require('../../lib/models/user').User;
const invoice_schema = require('../../lib/schemas/invoice-schema').schema;
const validate = ajv.compile(invoice_schema);

router.post("/", async function (req, res) {
    const valid = validate(req.body);

    if (!valid) {
        console.log(validate.errors);
        res.send(validate.errors);
    }
    else {
        const user = req.body.User;
        const result = await db_methods.auth(User, user);
        res.send({ authenticated: result });
    }

})
module.exports = router;

