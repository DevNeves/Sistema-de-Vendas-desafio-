import './Navbar.css';

import Dropdown from './Dropdown';

const Navbar = () => {
  const itensCadastro = [
    { title: 'Bairro', link: '/admin/bairro' },
    { title: 'Cidade', link: '/admin/cidade' },
    { title: 'Pessoas', link: '/admin/pessoa' },
    { title: 'Produtos', link: '/admin/produto' },
  ];

  const itensMovimentos = [{ title: 'Vendas', link: '/admin/vendas' }];
  const itensRelatorios = [
    { title: 'Lista de Pessoas', link: '/admin/lista-pessoas' },
    { title: 'Lista de Vendas', link: '/admin/lista-vendas' },
  ];

  return (
    <nav className="nav-container">
      <h1>Ápice Sistemas</h1>
      <div className="dropdowns">
        <Dropdown title={'Cadastro'} itens={itensCadastro} />
        <Dropdown title={'Movimentos'} itens={itensMovimentos} />
        <Dropdown title={'Relátorios'} itens={itensRelatorios} />
      </div>
    </nav>
  );
};

export default Navbar;
