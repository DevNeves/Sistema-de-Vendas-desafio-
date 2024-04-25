import './District.css';

import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDistrictContext } from '../../hooks/useDistrictContext';

const toastAtt = {
  position: 'bottom-left',
  autoClose: 1500,
  pauseOnHover: false,
};

const InsertDistrict = () => {
  const { districts, addDistrict, getDistricts, districtToEdit, editDistrict, setDistrictToEdit } =
    useDistrictContext();
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (districtToEdit) {
      const input = ref.current;

      input.id.value = districtToEdit.id;
      input.bairro.value = districtToEdit.nome;
    }
  }, [districtToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = ref.current;
    const regex = /^[a-zA-ZÀ-ú0-9\s.'-]{2,50}$/;

    const id = parseInt(input.id.value);
    const district = input.bairro.value;

    const regexDistrictTest = !regex.test(district);
    const idExists = districts.some((district) => district.id === id);
    const districtExists = districts.some((item) => item.nome === district);

    if (districtExists) {
      toast.error('Este bairro já está cadastrado.', toastAtt);
      return;
    }

    if (idExists) {
      toast.error('ID já cadastrado. Por favor, insira um ID diferente.', toastAtt);
      return;
    }

    if (regexDistrictTest) {
      toast.error('Por favor insira dados válidos!', toastAtt);
      return;
    }

    if (districtToEdit) {
      editDistrict(id, district);
    } else {
      addDistrict(id, district);
    }

    toast.success('Bairro cadastrado!', toastAtt);
    getDistricts();
    setDistrictToEdit(null);
    input.id.value = '';
    input.bairro.value = '';
    navigate('/admin/listar-bairros');
  };

  return (
    <div className="create-container">
      <Link to="/admin/listar-bairros">
        <button className="listDistricts__btn">Bairros</button>
      </Link>

      <h2>Cadastrar Bairro</h2>
      <br />
      <form ref={ref} onSubmit={handleSubmit} className="createDistrict__form">
        <label className="input__area">
          <label>Código</label>
          <input className="id__input" type="number" name="id" min={1} required />
        </label>
        <label className="input__area">
          <label>Bairro</label>
          <input className="district__input" type="text" name="bairro" placeholder="" required />
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

export default InsertDistrict;
