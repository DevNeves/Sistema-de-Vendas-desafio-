const connection = require('../database/db');

const getProducts = (_, res) => {
  const sql = 'SELECT * FROM produto';

  connection.query(sql, (err, data) => {
    if (err) throw err;

    return res.status(200).json(data);
  });
};

const addProduct = (req, _) => {
  const sql = 'INSERT INTO produto (id, nome, vr_venda) VALUES (?)';

  const { id, nome, vr_venda } = req.body;
  const values = [id, nome, vr_venda];

  connection.query(sql, [values], (err) => {
    if (err) throw err;
  });
};

const editProduct = (req, _) => {
  const sql = 'UPDATE produto SET `id` = ?, `nome` = ?, `vr_venda` = ? WHERE `id` = ?';

  const { id, nome, vr_venda } = req.body;
  const values = [id, nome, vr_venda];

  connection.query(sql, [...values, req.params.id], (err) => {
    if (err) throw err;
  });
};

const deleteProduct = (req, _) => {
  const sql = 'DELETE FROM produto WHERE `id` = ?';

  const id = req.params.id;

  connection.query(sql, [id], (err) => {
    if (err) throw err;
  });
};
module.exports = { getProducts, addProduct, editProduct, deleteProduct };
