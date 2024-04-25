import { useState, useEffect, useRef } from 'react';

import { FaRegEdit } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';

import TableSales from './TableSales';
import { useSalesContext } from '../../hooks/useSalesContext';

const SaleItensForm = ({
  totalSalePrice,
  handleSelectedProduct,
  handleQtyItens,
  handleUnityPrice,
  qtyItens,
  setQtyItens,
  setTotalSalePrice,
  unityPrice,
  products,
  selectedProduct,
}) => {
  const [editIndex, setEditIndex] = useState(null);

  const [editIten, setEditIten] = useState({
    id: null,
    product: '',
    qty: 0,
    price: 0,
    total: 0,
  });

  const { setSaleItensList, items, setItems, setTotal } = useSalesContext();
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedItem = {
        ...editIten,
        product: selectedProduct.nome,
        qty: qtyItens,
        price: unityPrice,
        total: (qtyItens * unityPrice).toFixed(2),
      };

      const updatedItems = [...items];
      updatedItems[editIndex] = updatedItem;
      setItems(updatedItems);

      setEditIndex(null);
      setEditIten({
        id: null,
        product: '',
        qty: 0,
        price: 0,
        total: 0,
      });
    } else {
      setItems((prevItems) => [
        ...prevItems,
        {
          id: items.length + 1,
          product: selectedProduct.nome,
          qty: qtyItens,
          price: unityPrice,
          total: (qtyItens * unityPrice).toFixed(2),
        },
      ]);
    }

    setTotal((prevValue) => prevValue + totalSalePrice);
  };

  useEffect(() => {
    const input = ref.current;

    const id_product = input.product.value;

    setSaleItensList((prevValues) => [
      ...prevValues,
      {
        id_product: id_product,
        qtd: qtyItens,
        vr_venda: totalSalePrice,
      },
    ]);

    setQtyItens(0);
    setTotalSalePrice(0);
  }, [items]);

  return (
    <div>
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="input-area__container2">
          <label className="input__area2">
            <label>Produto</label>
            <select className="product__select" name="product" onChange={handleSelectedProduct}>
              <option value="">Escolha o produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nome}
                </option>
              ))}
            </select>
          </label>
          <label className="input__area2">
            <label>Qtde Venda</label>
            <input
              type="number"
              name="qty"
              min={1}
              value={qtyItens}
              onChange={handleQtyItens}
              required
            />
          </label>
          <label className="input__area2">
            <label>Vr. Unitário</label>
            <input
              type="number"
              name="unity-value"
              value={unityPrice}
              min={1}
              step={0.01}
              onChange={handleUnityPrice}
              required
            />
          </label>
          <label className="input__area2">
            <label>Sub. Total</label>
            <input type="number" name="total" value={totalSalePrice.toFixed(2)} readOnly />
          </label>
          <div className="add__btn">
            <span>
              {editIndex !== null ? <FaRegEdit id="edit__btn" /> : <TiShoppingCart id="buy__btn" />}
            </span>
            <button type="submit">{editIndex !== null ? 'Editar' : 'Comprar'}</button>
          </div>
        </div>
      </form>
      <TableSales setEditIndex={setEditIndex} setEditIten={setEditIten} editIndex={editIndex} />
    </div>
  );
};

export default SaleItensForm;
