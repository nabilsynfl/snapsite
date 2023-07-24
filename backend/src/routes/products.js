const express = require('express');
const router = express.Router();
const productsController = require('../controller/products');
const {verifyUsers, verifyAdmin} = require('../middleware/authUsers');

//GET ALL PRODUCTS
router.get('/', verifyUsers, productsController.getAllProducts);

//GET PRODUCTS BY ID
router.get('/:id', verifyUsers, productsController.getProductsById);

//CREATE PRODUCTS
router.post('/', verifyUsers, productsController.createProduct);

//UPDATE PRODUCTS
router.patch('/:id', verifyUsers, productsController.updateProducts);

//DELTE PRODUCTS
router.delete('/:id', verifyUsers, productsController.deleteProducts);

module.exports = router
