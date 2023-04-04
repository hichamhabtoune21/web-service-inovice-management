const router = require('express').Router();




const create = require("./create");
const testauth = require("./testauth");
const permissions = require("./view_permissions");
const list = require("./invoice_list");
const search = require("./search_invoice");
const remove = require("./remove_invoice");


router.post("/", function () { }).use("/create", create);
router.post("/", function () { }).use("/remove", remove);
router.post("/", function () { }).use("/search", search);
router.post("/", function () { }).use("/testauth", testauth);
router.post("/", function () { }).use("/", list);
router.post("/", function () { }).use("/permissions", permissions);



module.exports = router;
