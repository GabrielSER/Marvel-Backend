const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, getPowers } = require("../controllers/powers")

router.get("/", getItems)
router.get("/id", getItem)
router.post("/", createItem)

module.exports = router