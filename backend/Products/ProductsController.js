const express = require('express');
const router = express.Router();

const Product = require('./Product');
const getProducts = Product.getProducts;
const addProduct = Product.addProduct;
const editProduct = Product.editProduct;
const deleteProduct = Product.deleteProduct;

router.get('/produtos', getProducts);
router.post('/salvar-produto', addProduct);
router.put('/editar-produto/:id', editProduct);
router.delete('/deletar-produto/:id', deleteProduct);

module.exports = router;
