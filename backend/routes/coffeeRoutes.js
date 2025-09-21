const express = require("express");
const router = express.Router();
const { getCoffeesByCategory, getCoffeeById, getCoffeeDetailsByFK } = require("../Controller/coffeeController");

router.get("/", getCoffeesByCategory); // GET /api/coffees?category_id=1
router.get("/:id", getCoffeeById);     // GET /api/coffees/2
router.get("/byfk", getCoffeeDetailsByFK); // GET /api/coffees/byfk?c_id=2

module.exports = router;
