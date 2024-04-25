import { useContext } from 'react';
import { CityContext } from '../contexts/CityContext';

export const useCityContext = () => {
  const context = useContext(CityContext);

  return context;
};
