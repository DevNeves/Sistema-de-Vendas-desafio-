import { useContext } from 'react';
import { PeopleContext } from '../contexts/PeopleContext';

export const usePeopleContext = () => {
  const context = useContext(PeopleContext);

  return context;
};
