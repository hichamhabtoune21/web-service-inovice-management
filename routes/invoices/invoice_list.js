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
      const result = await db_methods.findAll(Invoice, user);
      if (result == 403) {
        res.sendStatus(403);
      } else {
        res.status(200).send(result);
      }
    } else {
      res.sendStatus(401);
    }
  }
});

/**
* @swagger
* /invoices/list:
*   get:
*     summary: Get all invoices endpoint
*     description: Get all invoices of database
*     tags: [Invoices]
*     parameters:
*       - name: limit
*         in: query
*         description: Maximum number of invoices to return
*         required: false
*         schema:
*           type: integer
*           default: 10
*       - name: offset
*         in: query
*         description: Number of invoices to skip
*         required: false
*         schema:
*           type: integer
*           default: 0
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/createInvoice'
*       401:
*         description: Unauthorized
*       403:
*         description: Forbidden
*/


module.exports = router;