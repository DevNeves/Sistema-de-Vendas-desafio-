const connection = require('../database/db');

const getCities = (_, res) => {
  const sql = 'SELECT * FROM cidade';

  connection.query(sql, (err, data) => {
    if (err) throw err;

    return res.status(200).json(data);
  });
};

const addCity = (req, _) => {
  const sql = 'INSERT INTO cidade (id, nome, sigla_uf) VALUES (?)';

  const { id, cidade, uf } = req.body;
  const values = [id, cidade, uf];

  connection.query(sql, [values], (err) => {
    if (err) throw err;
  });
};

const editCity = (req, _) => {
  const sql = 'UPDATE cidade SET `id` = ?, `nome` = ?, `sigla_uf` = ? WHERE `id` = ?';

  const { id, cidade, uf } = req.body;
  const values = [id, cidade, uf];

  connection.query(sql, [...values, req.params.id], (err) => {
    if (err) throw err;
  });
};

const deleteCity = (req, _) => {
  const sql = 'DELETE FROM cidade WHERE id = ?';

  const id = req.params.id;

  connection.query(sql, [id], (err) => {
    if (err) throw err;
  });
};

module.exports = { getCities, addCity, editCity, deleteCity };
