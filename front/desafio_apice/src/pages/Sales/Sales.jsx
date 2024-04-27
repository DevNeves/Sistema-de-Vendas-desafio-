import './Sales.css';

import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSalesContext } from '../../hooks/useSalesContext';
import Sale from '../../components/SalesComponents/Sale';
import SaleItens from '../../components/SalesComponents/SaleItens';

const toastAtt = {
  position: 'bottom-left',
  autoClose: 1500,
  pauseOnHover: false,
};

const formateDate = (date) => {
  const currentDate = new Date();
  const inputDate = new Date(date);

  return inputDate > currentDate;
};

const Sales = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const {
    products,
    addSale,
    addSaleItens,
    saleItensList,
    saleToEdit,
    saleList,
    items,
    setItems,
    setTotal,
    editSale,
    setSaleToEdit,
    sales,
  } = useSalesContext();

  useEffect(() => {
    if (saleToEdit) {
      const input = ref.current;

      input.id.value = saleToEdit.id;
      input.date.value = saleToEdit.data.slice(0, 10);
      input.people.value = saleToEdit.pessoa;
      setItems([]);

      let total = 0;

      saleList.forEach((saleItem) => {
        if (saleItem.id_venda === saleToEdit.id) {
          const subtotal = saleItem.qtde_venda * saleItem.vr_unitario;
          total += subtotal;

          setItems((prevItems) => [
            ...prevItems,
            {
              id: saleItem.id,
              product: saleItem.nome_produto,
              qty: saleItem.qtde_venda,
              price: saleItem.vr_unitario,
              total: saleItem.vr_total,
            },
          ]);
        }
      });

      setTotal(parseFloat(total));
    }
  }, [saleToEdit]);

  const handleSalePage = () => {
    if (saleToEdit) {
      toast.error('Termine a edição para ir para as vendas!', toastAtt);
      return;
    }

    navigate('/admin/listar-vendas');
  };

  const handleSaleConfirm = () => {
    const input = ref.current;

    const sale_id = input.id.value;
    const date = input.date.value;
    const people = input.people.value;

    if (formateDate(date)) {
      toast.error('Insira uma data válida!', toastAtt);
      input.date.value = '';
      return;
    }

    if (items.length === 0) {
      toast.error('Selecione um produto para a venda!', toastAtt);
      return;
    }

    const idExists = sales.some((item) => item.id == sale_id);

    if (!idExists && saleToEdit) {
      toast.error('ID já cadastrado. Por favor, insira um ID diferente.', toastAtt);
      return;
    }

    if (saleToEdit) {
      editSale(sale_id, date, people);

      saleItensList.forEach(({ id_product, qtd, vr_venda }) => {
        if (!id_product || !qtd || !vr_venda) {
          return;
        }

        addSaleItens(sale_id, id_product, qtd, vr_venda);
      });
    } else {
      addSale(sale_id, date, people);

      saleItensList.forEach(({ id_product, qtd, vr_venda }) => {
        if (!id_product || !qtd || !vr_venda) {
          return;
        }

        addSaleItens(sale_id, id_product, qtd, vr_venda);
      });
    }

    navigate('/admin/listar-vendas');
    toast.success('Venda feita com sucesso!', toastAtt);
    setSaleToEdit(null);
    setItems([]);
    document.location.reload();
  };

  return (
    <div className="create-container">
      <button onClick={handleSalePage} className="listSales__btn">
        Vendas
      </button>
      <form ref={ref}>
        <Sale />
      </form>
      <SaleItens products={products} />
      <div className="btns__area">
        <button className="cancel__btn" onClick={() => document.location.reload()}>
          Cancelar
        </button>
        <button className="confirm__btn" onClick={handleSaleConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Sales;
