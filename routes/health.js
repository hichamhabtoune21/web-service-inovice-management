const api = require('../lib/api-service');
const router = api.Router();

router.get("/", function (req, res) {
    res.send({health: "ok"});
  });
  
  module.exports = router;