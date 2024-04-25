import { useContext } from 'react';
import { DistrictContext } from '../contexts/DistrictContext';

export const useDistrictContext = () => {
  const context = useContext(DistrictContext);

  return context;
};
