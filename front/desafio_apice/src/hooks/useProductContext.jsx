import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

export const useProductContext = () => {
  const context = useContext(ProductContext);

  return context;
};
