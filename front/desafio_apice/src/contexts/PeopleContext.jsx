import { createContext, useState, useEffect } from 'react';
import { HandleCrud } from '../crud/HandleCrud';

export const PeopleContext = createContext();

export const PeopleContextProvider = ({ children }) => {
  const [peoples, setPeoples] = useState([]);
  const [peopleToEdit, setPeopleToEdit] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const getCities = async () => {
    try {
      setCities(await HandleCrud('get', 'cidades'));
    } catch (err) {
      throw err;
    }
  };

  const getDistricts = async () => {
    try {
      setDistricts(await HandleCrud('get', 'bairros'));
    } catch (err) {
      throw err;
    }
  };

  const getPeoples = async () => {
    try {
      setPeoples(await HandleCrud('get', 'pessoas'));
    } catch (err) {
      throw err;
    }
  };

  const addPeople = async (
    id,
    nome,
    cidade,
    bairro,
    cep,
    endereco,
    numero,
    complemento,
    telefone,
    email
  ) => {
    await HandleCrud('post', 'salvar-pessoa', {
      id,
      nome,
      cidade,
      bairro,
      cep,
      endereco,
      numero,
      complemento,
      telefone,
      email,
    });
  };

  const editPeople = async (
    id,
    nome,
    cidade,
    bairro,
    cep,
    endereco,
    numero,
    complemento,
    telefone,
    email
  ) => {
    await HandleCrud('put', `editar-pessoa/${peopleToEdit.id}`, {
      id,
      nome,
      cidade,
      bairro,
      cep,
      endereco,
      numero,
      complemento,
      telefone,
      email,
    });
  };

  const deletePeople = async (id) => {
    await HandleCrud('delete', `deletar-pessoa/${id}`);
  };

  useEffect(() => {
    getPeoples();
    getCities();
    getDistricts();
  }, [setPeoples, setCities, setDistricts]);

  return (
    <PeopleContext.Provider
      value={{
        peoples,
        cities,
        districts,
        getPeoples,
        addPeople,
        editPeople,
        deletePeople,
        setPeopleToEdit,
        peopleToEdit,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
