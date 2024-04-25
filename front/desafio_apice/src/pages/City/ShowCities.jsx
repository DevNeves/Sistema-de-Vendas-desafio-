import './ShowCities.css';

import { useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useCityContext } from '../../hooks/useCityContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ShowCities = () => {
  const { getCities, cities, setCityToEdit, deleteCity } = useCityContext();
  const navigate = useNavigate();

  const handleEdit = (city) => {
    setCityToEdit(city);
    navigate('/admin/cidade');
  };

  const handleDelete = (id) => {
    deleteCity(id);
    toast.success('Cidade excluida!', {
      position: 'bottom-left',
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    getCities();
  }, [cities]);

  return (
    <div className="list-container">
      <Link to="/admin/cidade">
        <button className="city__btn">Cadastrar Cidade</button>
      </Link>
      <h2>Cidades</h2>
      <table>
        <thead>
          <tr>
            <th className="id__th">Código</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.nome}</td>
              <td>{city.sigla_uf}</td>
              <td className="actions__td">
                <FaRegEdit onClick={() => handleEdit(city)} className="edit__icon" />
                <FaRegTrashAlt onClick={() => handleDelete(city.id)} className="delete__icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCities;
