const router = require('express').Router();
const service = require('../../lib/api-service');

const db_methods = require('../../lib/db_methods');
const Invoice = require('../../lib/models/invoice').Invoice;

router.get("/", async function (req, res) {
    const invoices = await db_methods.findAll(Invoice);
    res.send(invoices);
  });

module.exports=router;