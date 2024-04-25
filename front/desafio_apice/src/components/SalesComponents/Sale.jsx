import { useSalesContext } from '../../hooks/useSalesContext';

const Sale = () => {
  const { peoples } = useSalesContext();

  return (
    <div className="input-area__container">
      <label className="input__area2">
        <label>Código</label>
        <input type="number" name="id" min={1} required />
      </label>
      <label className="input__area2">
        <label>Data da Venda</label>
        <input type="date" name="date" required />
      </label>
      <label className="input__area2">
        <label>Pessoa</label>
        <select className="people__select" name="people">
          {peoples.map((people) => (
            <option key={people.id} value={people.nome}>
              {people.nome}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Sale;
