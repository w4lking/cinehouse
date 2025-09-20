import { NavLink } from 'react-router-dom';
import styles from './AdminLayout.module.css';
// Recomendo usar ícones do Material-UI para consistência
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import TheatersIcon from '@mui/icons-material/Theaters';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function AdminLayout({ children }) {
  // Lógica para logout pode ser movida para um hook useAuth
  const handleLogout = () => {
    sessionStorage.clear();
    // Idealmente, o navigate viria de um hook ou prop
    window.location.href = '/'; 
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>CineHouse ADM</h1>
        <nav className={styles.nav}>
          <NavLink to="/adm/dashboard" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/adm/gerenciar-usuarios" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <GroupIcon />
            <span>Utilizadores</span>
          </NavLink>
          <NavLink to="/adm/gerenciar-filmes" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <TheatersIcon />
            <span>Filmes</span>
          </NavLink>
          <NavLink to="/adm/relatorios" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <AssessmentIcon />
            <span>Relatórios</span>
          </NavLink>
        </nav>
        <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutButton}`}>
          <ExitToAppIcon />
          <span>Sair</span>
        </button>
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;