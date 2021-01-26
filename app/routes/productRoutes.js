const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/list', productController.indexProduct);
router.post('/', productController.addProduct);
router.get('/:productId', productController.ShowProduct)
router.patch('/:productId', productController.updateProduct)
router.delete('/:productId', productController.removeProduct);

module.exports = router