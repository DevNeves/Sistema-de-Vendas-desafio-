const connection = require('../database/db');

const getPeoples = (_, res) => {
  const sql = 'SELECT * FROM pessoa';

  connection.query(sql, (err, data) => {
    if (err) throw err;

    return res.status(200).json(data);
  });
};

const addPeople = (req, _) => {
  const sql =
    'INSERT INTO pessoa (id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email) VALUES (?)';

  const { id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email } =
    req.body;
  const values = [id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email];

  connection.query(sql, [values], (err) => {
    if (err) throw err;
  });
};

const editPeople = (req, _) => {
  const sql =
    'UPDATE pessoa SET `id` = ?, `nome` = ?, `cidade` = ?, `bairro` = ?, `cep` = ?, `endereco` = ?, `numero` = ?, `complemento` = ?, `telefone` = ?, `email` = ? WHERE `id` = ?';

  const { id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email } =
    req.body;
  const values = [id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email];

  connection.query(sql, [...values, req.params.id], (err) => {
    if (err) throw err;
  });
};

const deletePeople = (req, _) => {
  const sql = 'DELETE FROM pessoa WHERE id = ?';

  const id = req.params.id;

  connection.query(sql, [id], (err) => {
    if (err) throw err;
  });
};

module.exports = { getPeoples, addPeople, editPeople, deletePeople };
