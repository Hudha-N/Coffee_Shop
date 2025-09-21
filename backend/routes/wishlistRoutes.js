const express = require("express");
const router = express.Router();
const wishlistController = require("../Controller/wishlistController");

router.post("/add", wishlistController.addToWishlist);
router.get("/", wishlistController.getWishlist);
router.post("/remove", wishlistController.removeFromWishlist);

module.exports = router;