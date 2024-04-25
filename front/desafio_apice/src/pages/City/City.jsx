import './City.css';

import { useRef, useEffect } from 'react';
import { useCityContext } from '../../hooks/useCityContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const toastAtt = {
  position: 'bottom-left',
  autoClose: 1500,
  pauseOnHover: false,
};

const City = () => {
  const { cities, addCity, getCities, editCity, setCityToEdit, cityToEdit } = useCityContext();
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (cityToEdit) {
      const input = ref.current;

      input.id.value = cityToEdit.id;
      input.cidade.value = cityToEdit.nome;
      input.uf.value = cityToEdit.sigla_uf;
    }
  }, [cityToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = ref.current;
    const regex = /^[\p{L}\s]+$/u;

    const id = parseInt(input.id.value);
    const city = input.cidade.value;
    const uf = input.uf.value;

    const regexCityTest = !regex.test(city);
    const idExists = cities.some((city) => city.id === id);
    const cityExists = cities.some((item) => item.nome === city);

    if (cityExists) {
      toast.error('Essa cidade já está cadastrada!', toastAtt);
      return;
    }

    if (idExists) {
      toast.error('ID já cadastrado. Por favor, insira um ID diferente.', toastAtt);
      return;
    }

    if (regexCityTest) {
      toast.error('Por favor insira dados válidos!', toastAtt);
      return;
    }

    if (cityToEdit) {
      editCity(id, city, uf);
    } else {
      addCity(id, city, uf);
    }

    toast.success('Cidade cadastrada!', toastAtt);
    getCities();
    setCityToEdit(null);
    input.id.value = '';
    input.cidade.value = '';
    input.uf.value = '';
    navigate('/admin/listar-cidades');
  };

  return (
    <div className="create-container">
      <Link to="/admin/listar-cidades">
        <button className="listCities__btn">Cidades</button>
      </Link>
      <h2>Cadastrar Cidade</h2>
      <br />
      <form ref={ref} onSubmit={handleSubmit} className="createCity__form">
        <label className="input__area">
          <label>Código</label>
          <input className="id__input" type="number" name="id" min={1} required />
        </label>
        <label className="input__area">
          <label>Sigla UF</label>
          <input className="cityUF__input" type="text" name="uf" required />
        </label>
        <label className="input__area">
          <label>Cidade</label>
          <input className="city__input" type="text" name="cidade" required />
        </label>
        <div className="btns__area">
          <button className="cancel__btn">Cancelar</button>
          <button className="confirm__btn" type="submit">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default City;
