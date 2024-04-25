import './Products.css';

import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useProductContext } from '../../hooks/useProductContext';

const toastAtt = {
  position: 'bottom-left',
  autoClose: 1500,
  pauseOnHover: false,
};

const Products = () => {
  const { products, getProducts, addProduct, editProduct, productToEdit, setProductToEdit } =
    useProductContext();
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (productToEdit) {
      const input = ref.current;

      input.price.value = productToEdit.vr_venda;
      input.product.value = productToEdit.nome;
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = ref.current;

    const id = input.id.value;
    const price = input.price.value.replace(',', '.');
    const product = input.product.value;

    const idExists = products.some((item) => item.id == id);

    if (idExists) {
      toast.error('ID já cadastrado. Por favor, insira um ID diferente.', toastAtt);
      return;
    }

    if (productToEdit) {
      editProduct(id, product, price);
    } else {
      addProduct(id, product, price);
    }

    toast.success('Produto cadastrado com sucesso!', toastAtt);
    getProducts();
    setProductToEdit(null);
    input.id.value = '';
    input.price.value = '';
    input.product.value = '';
    navigate('/admin/listar-produtos');
  };

  return (
    <div className="create-container">
      <Link to="/admin/listar-produtos">
        <button className="listProducts__btn">Produtos</button>
      </Link>
      <h2>Cadastrar Produto</h2>
      <br />
      <form ref={ref} onSubmit={handleSubmit} className="createProduct__form">
        <label className="input__area">
          <label>Código</label>
          <input className="id__input" type="number" name="id" min={1} required />
        </label>
        <label className="input__area">
          <label>Valor R$</label>
          <input
            className="procutdValue__input"
            type="number"
            name="price"
            max={100000}
            step={0.01}
            required
          />
        </label>
        <label className="input__area">
          <label>Produto</label>
          <input className="product__input" type="text" name="product" required />
        </label>
        <div className="btns__area">
          <button className="cancel__btn">Cancelar</button>
          <button className="confirm__btn">Confirmar</button>
        </div>
      </form>
    </div>
  );
};

export default Products;
