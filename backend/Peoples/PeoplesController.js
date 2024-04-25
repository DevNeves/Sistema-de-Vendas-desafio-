const express = require('express');
const router = express.Router();

const People = require('./People');
const getPeoples = People.getPeoples;
const addPeople = People.addPeople;
const editPeople = People.editPeople;
const deletePeople = People.deletePeople;

router.get('/pessoas', getPeoples);
router.post('/salvar-pessoa', addPeople);
router.put('/editar-pessoa/:id', editPeople);
router.delete('/deletar-pessoa/:id', deletePeople);

module.exports = router;
