import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Table = ({
  productIsChecked,
  peopleIsChecked,
  dataIsChecked,
  productFiltered,
  salesFiltered,
}) => {
  const table = useRef();

  const handlePrint = useReactToPrint({
    content: () => table.current,
  });

  return (
    <div>
      <div ref={table}>
        <h2 className="list">Lista de Vendas</h2>
        <table>
          <thead>
            <tr>
              <th className="id__th">Código</th>
              <th>Pessoa</th>
              <th>Total Venda</th>
            </tr>
          </thead>
          <tbody>
            {productIsChecked &&
              productFiltered.map((sale, i) => (
                <tr key={i}>
                  <td>{sale.id}</td>
                  <td>{sale.pessoa}</td>
                  <td>{sale.total_compras}</td>
                </tr>
              ))}
            {peopleIsChecked &&
              salesFiltered.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.pessoa}</td>
                  <td>{sale.total_compras}</td>
                </tr>
              ))}
            {dataIsChecked &&
              salesFiltered.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.pessoa}</td>
                  <td>{sale.total_compras}</td>
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
