const api = require('../../lib/api-service');
const router = api.Router();
const db_methods=require('../../lib/db_methods');
const User=require('../../lib/models/user').User;

router.get("/", async function (req, res) {
  try {
    const users = await db_methods.findAll(User);
    res.send(users);
  } catch (error) {
    console.error('Failed to retrieve data : ', error);
  }
});

module.exports = router;