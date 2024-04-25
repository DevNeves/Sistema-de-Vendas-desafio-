import { useState, useEffect } from 'react';
import SaleItensForm from './SaleItensForm';

const SaleItens = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [unityPrice, setUnityPrice] = useState(0);
  const [qtyItens, setQtyItens] = useState(0);
  const [totalSalePrice, setTotalSalePrice] = useState(0);

  useEffect(() => {
    if (selectedProduct) {
      setUnityPrice(selectedProduct.vr_venda);
      setQtyItens(0);
      setTotalSalePrice(0);
    }
  }, [selectedProduct, setQtyItens]);

  const handleSelectedProduct = (e) => {
    const idProduct = e.target.value;

    const product = products.find((product) => product.id == idProduct);
    setSelectedProduct(product);
  };

  const handleUnityPrice = (e) => {
    setUnityPrice(parseFloat(e.target.value));
  };

  const handleQtyItens = (e) => {
    const qtyItens = parseFloat(e.target.value);

    setQtyItens(qtyItens);
    setTotalSalePrice(qtyItens * unityPrice);
  };

  return (
    <SaleItensForm
      totalSalePrice={totalSalePrice}
      handleSelectedProduct={handleSelectedProduct}
      handleQtyItens={handleQtyItens}
      handleUnityPrice={handleUnityPrice}
      selectedProduct={selectedProduct}
      qtyItens={qtyItens}
      setQtyItens={setQtyItens}
      setUnityPrice={setUnityPrice}
      setTotalSalePrice={setTotalSalePrice}
      unityPrice={unityPrice}
      products={products}
    />
  );
};

export default SaleItens;
