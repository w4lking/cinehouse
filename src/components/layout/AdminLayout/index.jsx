
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../../config/adminRoutes'; // 1. Importa as rotas

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
// import TheatersIcon from '@mui/icons-material/Theaters';
import HomeIcon from '@mui/icons-material/Home';
// import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import styles from './AdminLayout.module.css';

function AdminLayout({ children }) {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/'; 
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>CineHouse ADM</h1>
        <nav className={styles.nav}>
          <NavLink to={ADMIN_ROUTES.DASHBOARD} className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to={ADMIN_ROUTES.MANAGE_USERS} className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <GroupIcon />
            <span>Utilizadores</span>
          </NavLink>
          <NavLink to={ADMIN_ROUTES.HOME} className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <HomeIcon />
            <span>Home</span>
          </NavLink>
          {/* <NavLink to={ADMIN_ROUTES.REPORTS} className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            <AssessmentIcon />
            <span>Relatórios</span>
          </NavLink> */}
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