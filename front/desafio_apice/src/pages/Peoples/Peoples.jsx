import './Peoples.css';

import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePeopleContext } from '../../hooks/usePeopleContext';

const toastAtt = {
  position: 'bottom-left',
  autoClose: 1500,
  pauseOnHover: false,
};

const validateInput = (value, regex) => {
  const isValid = regex.test(value);
  const message = isValid ? '' : 'Campo inválido!';

  return { isValid, message };
};

const nameRegex = /^[a-zA-Z0-9À-ú\s.'-]{4,100}$/;
const cepRegex = /^\d{5}-\d{3}$/;
const addressRegex = /^[a-zA-Z0-9À-ú\s.'-]{2,200}$/;
const numberRegex = /^[a-zA-Z0-9\s.'-]{1,10}$/;
const complementRegex = /^[a-zA-Z0-9À-ú\s.'-]{0,100}$/;
const foneRegex = /^\(?\d{2}\)?[-. ]?\d{4,5}-?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Peoples = () => {
  const {
    peoples,
    getPeoples,
    cities,
    districts,
    addPeople,
    peopleToEdit,
    setPeopleToEdit,
    editPeople,
  } = usePeopleContext();

  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (peopleToEdit) {
      const input = ref.current;

      input.name.value = peopleToEdit.nome;
      input.city.value = peopleToEdit.cidade;
      input.district.value = peopleToEdit.bairro;
      input.cep.value = peopleToEdit.cep;
      input.address.value = peopleToEdit.endereco;
      input.number.value = peopleToEdit.numero;
      input.complement.value = peopleToEdit.complemento;
      input.fone.value = peopleToEdit.telefone;
      input.email.value = peopleToEdit.email;
    }
  }, [peopleToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault(e);

    const input = ref.current;

    const id = parseInt(input.id.value);
    const name = input.name.value;
    const city = input.city.value;
    const district = input.district.value;
    const cep = input.cep.value;
    const address = input.address.value;
    const number = input.number.value;
    const complement = input.complement.value;
    const fone = input.fone.value;
    const email = input.email.value;

    const idExists = peoples.some((people) => people.id === id);

    const validations = [
      { value: name, regex: nameRegex, fieldName: 'Nome' },
      { value: cep, regex: cepRegex, fieldName: 'CEP' },
      { value: address, regex: addressRegex, fieldName: 'Endereço' },
      { value: number, regex: numberRegex, fieldName: 'Número' },
      { value: complement, regex: complementRegex, fieldName: 'Complemento' },
      { value: fone, regex: foneRegex, fieldName: 'Telefone' },
      { value: email, regex: emailRegex, fieldName: 'Email' },
    ];

    let inputIsInvalid = '';
    let messageError = '';

    if (idExists) {
      toast.error('ID já cadastrado. Por favor, insira um ID diferente.', toastAtt);
      return;
    }

    validations.forEach(({ value, regex, fieldName }) => {
      let { isValid, message } = validateInput(value, regex);

      if (!isValid) {
        inputIsInvalid = false;
        messageError += `${fieldName} ${message}\n`;
      }
    });

    if (inputIsInvalid === false) {
      toast.error(messageError, toastAtt);
      inputIsInvalid = '';
      messageError = '';
      return;
    }

    if (peopleToEdit) {
      editPeople(id, name, city, district, cep, address, number, complement, fone, email);
    } else {
      addPeople(id, name, city, district, cep, address, number, complement, fone, email);
    }

    toast.success('Pessoa cadastrada!', toastAtt);
    getPeoples();
    setPeopleToEdit(null);
    input.id.value = '';
    input.name.value = '';
    input.city.value = '';
    input.district.value = '';
    input.cep.value = '';
    input.address.value = '';
    input.number.value = '';
    input.complement.value = '';
    input.fone.value = '';
    input.email.value = '';
    navigate('/admin/listar-pessoas');
  };

  return (
    <div className="create-container">
      <Link to="/admin/listar-pessoas">
        <button className="listPeoples__btn">Pessoas</button>
      </Link>

      <h2>Cadastrar</h2>
      <br />
      <form ref={ref} onSubmit={handleSubmit} className="createPeoples__form">
        <label className="input__area">
          <label>Código</label>
          <input className="id__input" type="number" name="id" min={1} required />
        </label>
        <label className="input__area">
          <label>Nome</label>
          <input type="text" placeholder="" name="name" required />
        </label>
        <label className="input__area">
          <label>Cidade</label>
          <select name="city">
            {cities.map(({ nome, id }) => (
              <option key={id} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        </label>
        <label className="input__area">
          <label>Bairro</label>
          <select name="district">
            {districts.map(({ nome, id }) => (
              <option key={id} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        </label>
        <label className="input__area">
          <label>CEP</label>
          <input type="text" name="cep" required />
        </label>
        <label className="input__area">
          <label>Endereço</label>
          <input type="text" name="address" required />
        </label>
        <label className="input__area">
          <label>Número</label>
          <input type="text" name="number" required />
        </label>
        <label className="input__area">
          <label>Complemento</label>
          <input type="text" name="complement" required />
        </label>
        <label className="input__area">
          <label>Telefone</label>
          <input type="text" name="fone" />
        </label>
        <label className="input__area">
          <label>Email</label>
          <input type="email" name="email" required />
        </label>
        <div className="btns__area">
          <button className="cancel__btn" onClick={() => document.location.reload()}>
            Cancelar
          </button>
          <button className="confirm__btn" type="submit">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Peoples;
