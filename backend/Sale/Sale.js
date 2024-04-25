const connection = require('../database/db');

const getItens = (_, res) => {
  const sql =
    'SELECT produto.id, produto.nome AS nome_produto, produto.vr_venda AS vr_unitario,venda_itens.qtde AS qtde_venda, venda_itens.vr_venda AS vr_total, venda_itens.id_venda AS id_venda FROM venda_itens JOIN produto ON venda_itens.id_produto = produto.id;';

  connection.query(sql, (err, data) => {
    if (err) throw err;

    return res.status(200).json(data);
  });
};

const getSales = (_, res) => {
  const sql =
    'SELECT venda.pessoa AS pessoa, venda.id AS id, venda.dt_venda AS data, SUM(venda_itens.vr_venda) AS total_compras FROM venda_itens JOIN venda ON venda_itens.id_venda = venda.id GROUP BY venda.id, venda.pessoa;';

  connection.query(sql, (err, data) => {
    if (err) throw err;

    return res.status(200).json(data);
  });
};

const addSale = (req, _) => {
  const sql = 'INSERT INTO venda (id, dt_venda , pessoa) VALUES (?)';

  const { id, dt_venda, pessoa } = req.body;
  const values = [id, dt_venda, pessoa];

  connection.query(sql, [values], (err) => {
    if (err) throw err;
  });
};

const addSaleItens = (req, _) => {
  const sql = 'INSERT INTO venda_itens (id_venda, id_produto, qtde, vr_venda) VALUES (?)';

  const { id_venda, id_produto, qtde, vr_venda } = req.body;
  const values = [id_venda, id_produto, qtde, vr_venda];

  connection.query(sql, [values], (err) => {
    if (err) throw err;
  });
};

const editSale = (req, _) => {
  const sql = 'UPDATE venda SET `id` = ?, dt_venda = ?, pessoa = ? WHERE `id` = ?';

  const { id, dt_venda, pessoa } = req.body;
  const values = [id, dt_venda, pessoa];

  connection.query(sql, [...values, req.params.id], (err) => {
    if (err) throw err;
  });
};

const deleteSale = (req, _) => {
  const sql = 'DELETE FROM venda WHERE id = ?;';

  connection.query(sql, [req.params.id], (err) => {
    if (err) throw err;
  });
};

const deleteItem = (req, _) => {
  const sql = 'DELETE FROM venda_itens WHERE id_produto = ?';

  connection.query(sql, [req.params.id], (err) => {
    if (err) throw err;
  });
};
module.exports = { getItens, addSaleItens, addSale, editSale, deleteSale, deleteItem, getSales };
