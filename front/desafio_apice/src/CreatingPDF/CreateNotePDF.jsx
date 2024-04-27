import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const CreateNotePDF = (sale, saleList, peoples) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const peopleSelected = peoples.filter((people) => sale.pessoa === people.nome);
  const userProducts = saleList.filter((saleUser) => sale.id === saleUser.id_venda);

  const tableBody = userProducts.map((product) => [
    product.id,
    product.nome_produto,
    product.vr_unitario,
    product.qtde_venda,
    product.vr_total,
  ]);

  const docDefinition = {
    pageSize: 'A5',
    pageOrientation: 'landscape',
    pageMargins: [15, 20, 15, 40],

    content: [
      { text: 'MERCADO', style: 'title' },
      {
        text: 'AVENIDA NOME LOREM IPSUM, 6222 - ALPES - CIDADE - PR - CEP: 0000-000',
      },
      { text: 'CNPJ: 00.518.953/0001-46' },
      { text: 'Fone: (44)3333-3333 - Whatsapp: (44) 99999-9999', style: 'description' },
      { text: 'Venda de Mercadoria:', style: 'subheader' },
      { text: `CLIENTE: ${sale.pessoa}` },
      { text: `ENDEREÇO:  ${peopleSelected[0].endereco}` },
      { text: `CIDADE.: ${peopleSelected[0].cidade} ` },
      { text: `TELEFONE: ${peopleSelected[0].telefone}` },
      { text: `EMAIL: ${peopleSelected[0].email}`, margin: [0, 0, 0, 10] },
      {
        table: {
          widths: ['*', 200, 100, '*', 100],
          body: [['Código', 'Produto', 'VR UNIT', 'QUANT', 'VR TOTAL'], ...tableBody],
        },
        margin: [0, 0, 0, 60],
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'ASSINATURA \n ----------------------',
            margin: [60, 0, 0, 10],
          },
          {
            text: `VALOR TOTAL \n ---------------- \n${sale.total_compras}`,
            alignment: 'right',
            margin: [50, 0, 0, 0],
          },
        ],
      },
    ],

    styles: {
      title: {
        fontSize: 25,
        bold: true,
      },
      description: {
        margin: [0, 0, 0, 20],
      },
      subheader: {
        margin: [0, 0, 0, 10],
      },
    },
  };

  pdfMake.createPdf(docDefinition).open();
};

export default CreateNotePDF;
