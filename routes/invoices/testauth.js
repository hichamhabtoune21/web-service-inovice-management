const router = require('express').Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const db_methods = require('../../lib/db_methods');
const User = require('../../lib/models/user').User;
const invoice_schema = require('../../lib/schemas/invoice_schema').schema;
const validate = ajv.compile(invoice_schema);

router.post("/", async function (req, res) {
    const valid = validate(req.body);
    /*
    if (!valid) {
        console.log(validate.errors);
        res.send(validate.errors);
    }
    else {
        const user = req.body.User;
        const result = await db_methods.auth(user);
        res.send({ authenticated: result });
    }
    */
    const user = req.headers.authorization;
    let basic = user.replace('Basic ','');
    console.log(user)
    basic = Buffer.from(basic, 'base64').toString('utf8') 

    const credentials = basic.split(":"); 
    const user_object={
        Email: credentials[0],
        Password: credentials[1]
    };
    res.send({ authenticated: credentials[1] });

})
module.exports = router;

