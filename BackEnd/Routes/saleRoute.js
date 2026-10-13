const express = require('express')
const router = express.Router();

const { createSales, getSalesByCategory } = require("../Controller/saleController");

// Insert sample sales data
router.post("/seed", createSales);

router.get("/category-summary", getSalesByCategory);
module.exports = router;
