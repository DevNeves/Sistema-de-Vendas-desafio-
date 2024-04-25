import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useSalesContext } from '../../hooks/useSalesContext';
import { toast } from 'react-toastify';

const toastAtt = {
  position: 'bottom-left',
  autoClose: 1500,
  pauseOnHover: false,
};

const TableSales = ({ setEditIndex, setEditIten, editIndex }) => {
  const { setTotal, setItems, items, total, saleToEdit, deleteItem } = useSalesContext();

  const handleDelete = (i, id) => {
    if (saleToEdit) {
      setTotal((prevValue) => prevValue - items[i].total);

      const updatedItems = [...items];
      updatedItems.splice(i, 1);
      setItems(updatedItems);
      deleteItem(id);
    } else {
      setTotal((prevValue) => prevValue - items[i].total);

      const updatedItems = [...items];
      updatedItems.splice(i, 1);
      setItems(updatedItems);
    }
  };

  const handleEdit = (i) => {
    if (editIndex !== null) {
      toast.error('Você já está editando um produto!', toastAtt);
      return;
    }

    setTotal((prevValue) => prevValue - items[i].total);

    setEditIndex(i);
    const itemToEdit = items[i];
    setEditIten(itemToEdit);
    deleteItem(itemToEdit.id);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Qtde Venda</th>
            <th>Vr. Unitário</th>
            <th>Sub. Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((iten, i) => (
              <tr key={i}>
                <td>{iten.id}</td>
                <td>{iten.product}</td>
                <td>{iten.qty}</td>
                <td>{iten.price}</td>
                <td>{iten.total}</td>
                <td className="actions__td">
                  <FaRegEdit onClick={() => handleEdit(i)} className="edit__icon" />
                  <FaRegTrashAlt
                    onClick={() => handleDelete(i, iten.id)}
                    className="delete__icon"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="total__area">
        <h2>Valor Total</h2>
        <span>{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default TableSales;
