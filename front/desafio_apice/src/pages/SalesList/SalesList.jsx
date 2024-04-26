import './SalesList.css';

import { useSalesContext } from '../../hooks/useSalesContext';
import { useState, useEffect } from 'react';

import FilterSales from '../../components/FilterSale/FilterSales';
import FilterProduct from '../../components/FilterSale/FilterProduct';
import Table from '../../components/FilterSale/Table';

const SalesList = () => {
  const { sales, saleList } = useSalesContext();

  const [dataIsChecked, setDataIsChecked] = useState(false);
  const [peopleIsChecked, setPeopleIsChecked] = useState(false);
  const [productIsChecked, setProductIsChecked] = useState(false);

  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [people, setPeople] = useState('');
  const [product, setProduct] = useState('');

  const map = new Map();

  saleList.forEach((item) => {
    map.set(item.nome_produto, item);
  });

  const uniqueProducts = Array.from(map.values());

  const [salesFiltered, setSalesFiltered] = useState([]);
  const [productFiltered, setProductFiltered] = useState([]);

  useEffect(() => {
    setSalesFiltered(
      FilterSales(sales, people, initialDate, finalDate, dataIsChecked, peopleIsChecked)
    );
    setProductFiltered(FilterProduct(sales, saleList, productIsChecked, product));
  }, [
    initialDate,
    finalDate,
    sales,
    saleList,
    people,
    product,
    dataIsChecked,
    peopleIsChecked,
    productIsChecked,
  ]);
  return (
    <div className="create-container">
      <h2>Listagem de Vendas</h2>
      <h3 className="filter-type">Filtrar por</h3>
      <div className="filter-container">
        <div className="filters-checkbox__container">
          <label className="filters-checkbox__area">
            <input
              className="filters__checkbox"
              type="checkbox"
              onChange={() => setDataIsChecked(!dataIsChecked)}
            />
            Data
          </label>
          <label className="filters-checkbox__area">
            <input
              className="filters__checkbox"
              type="checkbox"
              onChange={() => setPeopleIsChecked(!peopleIsChecked)}
            />
            Pessoa
          </label>
          <label className="filters-checkbox__area">
            <input
              className="filters__checkbox"
              type="checkbox"
              onChange={() => setProductIsChecked(!productIsChecked)}
            />
            Produto
          </label>
        </div>
        <div className="filters-input__container">
          <label>
            <input
              className="filters__date"
              type="date"
              onChange={(e) => setInitialDate(e.target.value)}
            />
            à
            <input
              className="filters__date"
              type="date"
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </label>
          <label>
            <select
              className="filters__select"
              name="peoples"
              onChange={(e) => setPeople(e.target.value)}
            >
              <option value="">Selecione uma pessoa</option>
              {sales.map((sale) => (
                <option key={sale.id} value={sale.pessoa}>
                  {sale.pessoa}
                </option>
              ))}
            </select>
          </label>
          <label>
            <select
              className="filters__select"
              name="products"
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {uniqueProducts.map((sale) => (
                <option key={sale.id} value={sale.nome_produto}>
                  {sale.nome_produto}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <Table
        productIsChecked={productIsChecked}
        peopleIsChecked={peopleIsChecked}
        dataIsChecked={dataIsChecked}
        productFiltered={productFiltered}
        salesFiltered={salesFiltered}
      />
    </div>
  );
};

export default SalesList;
