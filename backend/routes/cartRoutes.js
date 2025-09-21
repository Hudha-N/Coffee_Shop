const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');

// Get cart items by user id
router.get('/:userId', cartController.getCart);
// Save full cart for user
router.post('/', cartController.saveCart);
// Update single item quantity
router.put('/item/:itemId', cartController.updateItem);
// Delete item
router.delete('/item/:itemId', cartController.deleteItem);

module.exports = router;
