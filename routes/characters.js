const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, getPowers } = require("../controllers/characters")

router.get("/", getItems)
router.get("/id", getItem)
router.get("/id/powers", getPowers)
router.post("/id", createItem)

module.exports = router