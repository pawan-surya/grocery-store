const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { check } = require('express-validator');


router.get('/list', categoryController.indexCategory);
router.post('/', check('name').isLength({ min: 3 }).withMessage('must be at least 3 chars long'), categoryController.addCategory);
router.get('/:categoryId', categoryController.showCategory);
router.patch('/:categoryId', categoryController.updateCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;