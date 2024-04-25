import './ShowProducts.css';

import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../hooks/useProductContext';
import { toast } from 'react-toastify';

const ShowProducts = () => {
  const { getProducts, products, setProductToEdit, deleteProduct } = useProductContext();
  const navigate = useNavigate();

  const handleEdit = (product) => {
    setProductToEdit(product);
    navigate('/admin/produto');
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    toast.success('Produto deletado com sucesso!', {
      position: 'bottom-left',
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    getProducts();
  }, [products]);
  return (
    <div className="list-container">
      <Link to="/admin/produto">
        <button className="product__btn">Cadastrar Produto</button>
      </Link>
      <h2>Produtos</h2>
      <table>
        <thead>
          <tr>
            <th className="id__th">Código</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nome}</td>
              <td>R$ {product.vr_venda.replace('.', ',')}</td>
              <td className="actions__td">
                <FaRegEdit onClick={() => handleEdit(product)} className="edit__icon" />
                <FaRegTrashAlt onClick={() => handleDelete(product.id)} className="delete__icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProducts;
