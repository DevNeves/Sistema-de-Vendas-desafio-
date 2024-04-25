const connection = require('../database/db');

const getDistricts = (_, res) => {
  const sql = 'SELECT * FROM bairro';

  connection.query(sql, (err, data) => {
    if (err) throw err;

    return res.status(200).json(data);
  });
};

const addDistrict = (req, res) => {
  const sql = 'INSERT INTO bairro (id, nome) VALUES (?)';

  const { id, bairro } = req.body;
  const values = [id, bairro];

  connection.query(sql, [values], (err) => {
    if (err) throw err;
  });
};

const editDistrict = (req, res) => {
  const sql = 'UPDATE bairro SET `id` = ?, `nome` = ? WHERE `id` = ?';

  const values = [req.body.id, req.body.bairro];

  connection.query(sql, [...values, req.params.id], (err) => {
    if (err) throw err;
  });
};

const deleteDistrict = (req, res) => {
  const sql = 'DELETE FROM bairro WHERE id = ?';

  const id = req.params.id;

  connection.query(sql, [id], (err) => {
    if (err) throw err;
  });
};

module.exports = { getDistricts, addDistrict, editDistrict, deleteDistrict };
