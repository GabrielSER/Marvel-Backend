const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, getPowers, updateItem } = require("../controllers/characters")

router.get("/", getItems)
router.get("/id", getItem)
router.get("/id/powers", getPowers)
router.post("/", createItem)
router.put("/id", updateItem)


module.exports = router