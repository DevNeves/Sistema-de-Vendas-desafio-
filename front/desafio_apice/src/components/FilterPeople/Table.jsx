import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Table = ({ peoplesFiltered }) => {
  const table = useRef();

  const handlePrint = useReactToPrint({
    content: () => table.current,
  });

  return (
    <div>
      <div ref={table}>
        <h2 className="list">Lista de Pessoas</h2>
        <table>
          <thead>
            <tr>
              <th className="id__th">Código</th>
              <th>Nome</th>
              <th>Cidade</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {peoplesFiltered.map((people, i) => (
              <tr key={i}>
                <td>{people.id}</td>
                <td>{people.nome}</td>
                <td>{people.cidade}</td>
                <td>{people.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} className="create-pdf__btn">
        Gerar PDF
      </button>
    </div>
  );
};

export default Table;
