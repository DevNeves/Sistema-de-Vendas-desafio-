const getProductsFiltered = (saleList, productIsChecked, product) => {
  const productsFiltered = saleList.filter((sale) => {
    const productMatch = !productIsChecked || sale.nome_produto === product;

    return productMatch;
  });

  return productsFiltered;
};

const getProductsMatched = (filteredProducts, sales, productIsChecked) => {
  if (!filteredProducts) {
    return;
  }

  const productMatched = filteredProducts.map((productFiltered) => {
    const sale = sales.find((sale) => sale.id === productFiltered.id_venda);

    return productIsChecked ? sale : sales;
  });

  return productMatched;
};

const FilterProduct = (sales, saleList, productIsChecked, product) => {
  const filteredProducts = getProductsFiltered(saleList, productIsChecked, product);
  const productsMatched = getProductsMatched(filteredProducts, sales, productIsChecked);

  return productsMatched;
};

export default FilterProduct;
