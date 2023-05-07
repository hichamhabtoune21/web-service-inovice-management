const router = require('express').Router();




const create = require("./create");
const update = require("./update");
const testauth = require("./testauth");
const permissions = require("./view_permissions");
const list = require("./invoice_list");
const search = require("./search_invoice");
const remove = require("./remove_invoice");


router.put("/", function () { }).use("/create", create);
router.patch("/", function () { }).use("/update", update);
router.delete("/", function () { }).use("/remove", remove);
router.post("/", function () { }).use("/search", search);
router.post("/", function () { }).use("/testauth", testauth);
router.get("/", function () { }).use("/list", list);
router.post("/", function () { }).use("/permissions", permissions);




module.exports = router;
