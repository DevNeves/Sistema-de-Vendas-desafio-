import { createContext, useState, useEffect } from 'react';
import { HandleCrud } from '../crud/HandleCrud';

export const SalesContext = createContext();

export const SalesContextProvider = ({ children }) => {
  const [peoples, setPeoples] = useState([]);
  const [products, setProducts] = useState([]);

  const [saleList, setSaleList] = useState([]);
  const [saleItensList, setSaleItensList] = useState([]);
  const [sales, setSales] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [saleToEdit, setSaleToEdit] = useState(null);

  const getItens = async () => {
    try {
      setPeoples(await HandleCrud('get', 'pessoas'));
      setProducts(await HandleCrud('get', 'produtos'));
    } catch (err) {
      if (err) throw err;
    }
  };

  const addSale = async (id, dt_venda, pessoa) => {
    await HandleCrud('post', 'salvar-venda', { id, dt_venda, pessoa });
  };

  const addSaleItens = async (id_venda, id_produto, qtde, vr_venda) => {
    await HandleCrud('post', 'salvar-itens', { id_venda, id_produto, qtde, vr_venda });
  };

  const getSaleItensList = async () => {
    try {
      setSaleList(await HandleCrud('get', 'listar-venda'));
    } catch (err) {
      if (err) throw err;
    }
  };

  const getSales = async () => {
    try {
      setSales(await HandleCrud('get', 'listar-vendas'));
    } catch (err) {
      if (err) throw err;
    }
  };

  const editSale = async (id, dt_venda, pessoa) => {
    await HandleCrud('put', `editar-venda/${saleToEdit.id}`, { id, dt_venda, pessoa });
  };

  const deleteSale = async (id) => {
    await HandleCrud('delete', `deletar-venda/${id}`);
  };

  const deleteItem = async (id) => {
    await HandleCrud('delete', `deletar-item/${id}`);
  };

  useEffect(() => {
    getItens();
    getSaleItensList();
    getSales();
  }, [setPeoples, setProducts, setSaleList, setSales]);

  return (
    <SalesContext.Provider
      value={{
        peoples,
        products,
        getSaleItensList,
        setSaleItensList,
        addSaleItens,
        addSale,
        getSales,
        sales,
        saleList,
        items,
        setItems,
        saleItensList,
        setSaleToEdit,
        editSale,
        saleToEdit,
        deleteSale,
        deleteItem,
        setTotal,
        total,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
