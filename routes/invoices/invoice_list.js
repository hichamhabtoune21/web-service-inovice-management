const router = require('express').Router();
const service = require('../../lib/api-service');

const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;
const auth = require('basic-auth');

router.get("/", async function (req, res) {
  if (req.headers.authorization == null) {
    res.sendStatus(400)
  } else {
    const credentials = auth(req);
    const user = {
      Email: credentials.name,
      Password: credentials.pass
    };
     if (await db_methods.auth(user)) {
      const invoices = await db_methods.findAll(Invoice, user);
      if (invoices == 403) {
        res.sendStatus(403);
      } else {
        res.status(200).send(invoices);
      }
    } else {
      res.sendStatus(401);
    }
  }
});

module.exports = router;