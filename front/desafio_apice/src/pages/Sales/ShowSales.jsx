import './ShowSales.css';

import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSalesContext } from '../../hooks/useSalesContext';
import { toast } from 'react-toastify';

const toastAtt = {
  position: 'bottom-left',
  autoClose: 1500,
  pauseOnHover: false,
};

const ShowSales = () => {
  const { sales, getSales, deleteSale, setSaleToEdit, getSaleItensList } = useSalesContext();
  const navigate = useNavigate();

  const handleEdit = (sale) => {
    setSaleToEdit(sale);
    navigate('/admin/vendas');
  };

  const handleDelete = (id) => {
    deleteSale(id);
    toast.success('Venda deletada com sucesso!', toastAtt);
  };

  useEffect(() => {
    getSales();
    getSaleItensList();
  }, [sales]);

  return (
    <div className="list-container">
      <Link to="/admin/vendas">
        <button className="sales__btn">Vender</button>
      </Link>
      <h2>Vendas</h2>
      <table>
        <thead>
          <tr>
            <th className="id__th">Código</th>
            <th>Pessoa</th>
            <th>Total Venda</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.pessoa}</td>
              <td>{sale.total_compras}</td>
              <td className="actions__td">
                <FaRegEdit onClick={() => handleEdit(sale)} className="edit__icon" />
                <FaRegTrashAlt onClick={() => handleDelete(sale.id)} className="delete__icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowSales;
