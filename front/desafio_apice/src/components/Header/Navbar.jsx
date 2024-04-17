import './Navbar.css';

import Dropdown from './Dropdown';

const Navbar = () => {
  const itensCadastro = ['Bairro', 'Cidade', 'Pessoas', 'Produtos'];
  const itensMovimentos = ['Vendas'];
  const itensRelatorios = ['Lista de Pessoas', 'Lista de Vendas'];

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
