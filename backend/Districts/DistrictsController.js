const express = require('express');
const router = express.Router();

const District = require('./District');
const getDistricts = District.getDistricts;
const addDistrict = District.addDistrict;
const editDistrict = District.editDistrict;
const deleteDistrict = District.deleteDistrict;

router.get('/bairros', getDistricts);
router.post('/salvar-bairro', addDistrict);
router.put('/editar-bairro/:id', editDistrict);
router.delete('/deletar-bairro/:id', deleteDistrict);

module.exports = router;
