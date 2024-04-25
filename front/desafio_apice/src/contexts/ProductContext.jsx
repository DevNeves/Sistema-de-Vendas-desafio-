import { createContext, useEffect, useState } from 'react';
import { HandleCrud } from '../crud/HandleCrud';

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  const getProducts = async () => {
    setProducts(await HandleCrud('get', 'produtos'));
  };

  const addProduct = async (id, nome, vr_venda) => {
    await HandleCrud('post', 'salvar-produto', { id, nome, vr_venda });
  };

  const editProduct = async (id, nome, vr_venda) => {
    await HandleCrud('put', `editar-produto/${productToEdit.id}`, { id, nome, vr_venda });
  };

  const deleteProduct = async (id) => {
    await HandleCrud('delete', `deletar-produto/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        addProduct,
        editProduct,
        deleteProduct,
        setProductToEdit,
        productToEdit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
