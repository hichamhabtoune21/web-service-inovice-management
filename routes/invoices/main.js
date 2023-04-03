const router = require('express').Router();


router.get("/", async function (req, res) {
  const invoices = await db_methods.findAll(Invoice);
  res.send(invoices);
});

const create = require("./create");
const testauth = require("./testauth");

router.post("/", function () { }).use("/create", create);
router.post("/", function () { }).use("/testauth", testauth);




module.exports = router;
