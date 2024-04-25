const express = require('express');
const router = express.Router();

const Sale = require('./Sale');
const addSale = Sale.addSale;
const addSaleItens = Sale.addSaleItens;
const getItens = Sale.getItens;
const deleteSale = Sale.deleteSale;
const getSales = Sale.getSales;
const editSale = Sale.editSale;
const deleteItem = Sale.deleteItem;

router.post('/salvar-itens', addSaleItens);
router.post('/salvar-venda', addSale);
router.get('/listar-venda', getItens);
router.get('/listar-vendas', getSales);
router.put('/editar-venda/:id', editSale);
router.delete('/deletar-venda/:id', deleteSale);
router.delete('/deletar-item/:id', deleteItem);

module.exports = router;
