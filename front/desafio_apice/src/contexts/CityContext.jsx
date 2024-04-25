import { createContext, useEffect, useState } from 'react';
import { HandleCrud } from '../crud/HandleCrud';

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [cityToEdit, setCityToEdit] = useState(null);

  const getCities = async () => {
    try {
      setCities(await HandleCrud('get', 'cidades'));
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  };

  const addCity = async (id, cidade, uf) => {
    await HandleCrud('post', 'salvar-cidade', { id, cidade, uf });
  };

  const editCity = async (id, cidade, uf) => {
    await HandleCrud('put', `editar-cidade/${cityToEdit.id}`, { id, cidade, uf });
  };

  const deleteCity = async (id) => {
    await HandleCrud('delete', `deletar-cidade/${id}`);
  };

  useEffect(() => {
    getCities();
  }, [setCities]);

  return (
    <CityContext.Provider
      value={{ cities, getCities, addCity, editCity, deleteCity, cityToEdit, setCityToEdit }}
    >
      {children}
    </CityContext.Provider>
  );
};
