const api = require('../lib/api-service');
const router = api.Router();



router.get("/", function (req, res) {
  res.status(200).send({health: "ok"});
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health endpoint
 *     description: Returns a health status of the API
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             health:
 *               type: string
 *               description: Health status of the API
 *               example: ok
 */

module.exports = router;