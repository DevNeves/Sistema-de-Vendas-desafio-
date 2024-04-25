import { createContext, useEffect, useState } from 'react';

import { HandleCrud } from '../crud/HandleCrud';

export const DistrictContext = createContext();

export const DistrictContextProvider = ({ children }) => {
  const [districts, setDistricts] = useState([]);
  const [districtToEdit, setDistrictToEdit] = useState(null);

  const getDistricts = async () => {
    try {
      setDistricts(await HandleCrud('get', 'bairros'));
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  };

  const addDistrict = async (id, bairro) => {
    await HandleCrud('post', 'salvar-bairro', { id, bairro });
  };

  const editDistrict = async (id, bairro) => {
    await HandleCrud('put', `editar-bairro/${districtToEdit.id}`, { id, bairro });
  };

  const deleteDistrict = async (id) => {
    await HandleCrud('delete', `deletar-bairro/${id}`);
  };

  useEffect(() => {
    getDistricts();
  }, [setDistricts]);

  return (
    <DistrictContext.Provider
      value={{
        districts,
        setDistricts,
        getDistricts,
        addDistrict,
        deleteDistrict,
        editDistrict,
        districtToEdit,
        setDistrictToEdit,
      }}
    >
      {children}
    </DistrictContext.Provider>
  );
};
