import './ShowDistrict.css';

import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDistrictContext } from '../../hooks/useDistrictContext';
import { toast } from 'react-toastify';

const ShowDistrict = () => {
  const { districts, deleteDistrict, getDistricts, setDistrictToEdit } = useDistrictContext();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    deleteDistrict(id);
    toast.success('Bairro excluido!', {
      position: 'bottom-left',
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  const handleEdit = (district) => {
    setDistrictToEdit(district);
    navigate('/admin/bairro');
  };

  useEffect(() => {
    getDistricts();
  }, [districts]);

  return (
    <div className="list-container">
      <Link to="/admin/bairro">
        <button className="district__btn">Cadastrar Bairro</button>
      </Link>
      <h2>Bairros</h2>
      <table>
        <thead>
          <tr>
            <th className="id__th">Código</th>
            <th>Bairro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district) => (
            <tr key={district.id}>
              <td>{district.id}</td>
              <td>{district.nome}</td>
              <td className="actions__td">
                <FaRegEdit onClick={() => handleEdit(district)} className="edit__icon" />
                <FaRegTrashAlt onClick={() => handleDelete(district.id)} className="delete__icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowDistrict;
