const express = require('express');
const router = express.Router();

const City = require('./City');
const getCities = City.getCities;
const addCity = City.addCity;
const editCity = City.editCity;
const deleteCity = City.deleteCity;

router.get('/cidades', getCities);
router.post('/salvar-cidade', addCity);
router.put('/editar-cidade/:id', editCity);
router.delete('/deletar-cidade/:id', deleteCity);

module.exports = router;
