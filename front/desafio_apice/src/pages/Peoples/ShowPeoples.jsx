import './ShowPeoples.css';

import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePeopleContext } from '../../hooks/usePeopleContext';
import { toast } from 'react-toastify';

const ShowPeoples = () => {
  const { getPeoples, peoples, deletePeople, setPeopleToEdit } = usePeopleContext();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deletePeople(id);
    toast.success('Pessoa excluida!', {
      position: 'bottom-left',
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  const handleEdit = (people) => {
    setPeopleToEdit(people);
    navigate('/admin/pessoa');
  };

  useEffect(() => {
    getPeoples();
  }, [peoples]);

  return (
    <div className="list-container">
      <Link to="/admin/pessoa">
        <button className="people__btn">Cadastrar Pessoa</button>
      </Link>
      <h2>Pessoas</h2>
      <table>
        <thead>
          <tr>
            <th className="id__th">Código</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {peoples.map((people, i) => (
            <tr key={i}>
              <td>{people.id}</td>
              <td>{people.nome}</td>
              <td>{people.cidade}</td>
              <td>{people.telefone}</td>
              <td className="actions__td">
                <FaRegEdit onClick={() => handleEdit(people)} className="edit__icon" />
                <FaRegTrashAlt onClick={() => handleDelete(people.id)} className="delete__icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPeoples;
