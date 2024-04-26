import './PeoplesList.css';

import { useEffect, useState } from 'react';
import { usePeopleContext } from '../../hooks/usePeopleContext';

import Filter from '../../components/FilterPeople/Filter';
import Table from '../../components/FilterPeople/Table';

const PeopleList = () => {
  const { peoples } = usePeopleContext();

  const mapCity = new Map();
  const mapDistrict = new Map();

  peoples.forEach((people) => {
    mapCity.set(people.cidade, people);
    mapDistrict.set(people.bairro, people);
  });

  const uniqueCities = Array.from(mapCity.values());
  const uniqueDistricts = Array.from(mapDistrict.values());

  const [nameIsChecked, setNameIsChecked] = useState(false);
  const [cityIsChecked, setCityIsChecked] = useState(false);
  const [districtIsChecked, setDistrictIsChecked] = useState(false);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const [peoplesFiltered, setPeoplesFiltered] = useState([]);

  useEffect(() => {
    setPeoplesFiltered(
      Filter(peoples, nameIsChecked, name, cityIsChecked, city, districtIsChecked, district)
    );
  }, [nameIsChecked, name, cityIsChecked, city, districtIsChecked, district]);

  return (
    <div className="create-container">
      <h2>Listagem de Pessoas</h2>
      <h3 className="filter-type">Filtrar por</h3>
      <div className="filter-container">
        <div className="filters-checkbox__container">
          <label className="filters-checkbox__area">
            <input
              className="filters__checkbox"
              checked={nameIsChecked}
              onChange={() => setNameIsChecked(!nameIsChecked)}
              type="checkbox"
            />
            Nome
          </label>
          <label className="filters-checkbox__area">
            <input
              className="filters__checkbox"
              checked={cityIsChecked}
              onChange={() => setCityIsChecked(!cityIsChecked)}
              type="checkbox"
            />
            Cidade
          </label>
          <label className="filters-checkbox__area">
            <input
              className="filters__checkbox"
              checked={districtIsChecked}
              onChange={() => setDistrictIsChecked(!districtIsChecked)}
              type="checkbox"
            />
            Bairro
          </label>
        </div>
        <div className="filters-input__container">
          <label>
            <input
              className="filter-name__input"
              type="text"
              onChange={(e) => setName(e.target.value.toLowerCase())}
            />
          </label>
          <label>
            <select
              className="filters__select"
              name="city"
              onChange={(e) => setCity(e.target.value.toLowerCase())}
            >
              <option value="">Selecione uma cidade</option>
              {uniqueCities.map((people) => (
                <option key={people.id} value={people.cidade}>
                  {people.cidade}
                </option>
              ))}
            </select>
          </label>
          <label>
            <select
              className="filters__select"
              name="district"
              onChange={(e) => setDistrict(e.target.value.toLowerCase())}
            >
              <option value="">Selecione um bairro</option>
              {uniqueDistricts.map((people) => (
                <option key={people.id} value={people.bairro}>
                  {people.bairro}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <Table peoplesFiltered={peoplesFiltered} />
    </div>
  );
};

export default PeopleList;
