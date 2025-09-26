import { NavLink, useNavigate } from 'react-router-dom';
import styles from './UserLayout.module.css';

// Ícones para os links de navegação do utilizador
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

function UserLayout({ children }) {
  const navigate = useNavigate();

  // Função de logout (pode ser movida para um hook de autenticação no futuro)
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  // Função para determinar a classe do link ativo
  const getLinkClass = ({ isActive }) => isActive ? styles.activeLink : styles.link;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div>
          {/* Pode ser um logo ou o nome do utilizador aqui */}
          <h1 className={styles.logo}>Minha Conta</h1>
          <nav className={styles.nav}>
            <NavLink to="/userSettings" className={getLinkClass} end>
              <AccountCircleIcon /> Perfil
            </NavLink>
            <NavLink to="/histPedidos" className={getLinkClass}>
              <HistoryIcon /> Histórico de Pedidos
            </NavLink>
            <NavLink to="/home" className={getLinkClass}>
              <HomeIcon /> Home
            </NavLink>
          </nav>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <LogoutIcon /> Sair
        </button>
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default UserLayout;

