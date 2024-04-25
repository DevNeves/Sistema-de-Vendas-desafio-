import { useContext } from 'react';
import { SalesContext } from '../contexts/SalesContext';

export const useSalesContext = () => {
  const context = useContext(SalesContext);

  return context;
};
