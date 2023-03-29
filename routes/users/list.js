const api = require('../../lib/api-service');
const router = api.Router();

router.get("/", function (req, res) {
    res.send({users: "test"});
  });

module.exports = router;