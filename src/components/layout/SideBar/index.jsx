import { NavLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import styles from './SideBar.module.css';

function SideBar({
  userProfile,
  onLogout,
  selectedYear,
  onYearChange,
  years,
  selectedPrice,
  onPriceChange,
  showFilters = true
}) {
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) => isActive ? styles.activeLink : styles.navLink;

  return (
    <aside className={styles.sidebar}>
      {/* --- Grupo Superior: Logo e Navegação --- */}
      <div className={styles.topSection}>
        <h1 className={styles.logo}><img src="/src/assets/logos/CinehouseNewLogo_2.png" alt="CineHouse Logo" /></h1>
        <nav className={styles.nav}>
          <NavLink to="/home" className={getLinkClass}>
            <HomeIcon />
            <span>Home</span>
          </NavLink>
          {userProfile === "funcionario" && (
            <NavLink to="/adm" className={getLinkClass}>
              <DashboardIcon />
              <span>Dashboard</span>
            </NavLink>
          )}
          {userProfile === "cliente" && (
            <NavLink to="/UserSettings" className={getLinkClass}>
              <GroupIcon />
              <span>Perfil</span>
            </NavLink>
          )}
        </nav>
      </div>

      {/* --- Grupo Central: Filtros --- */}
      {showFilters && (
        <div className={styles.filters}>
          <h3>Filtros</h3>
          <select
            value={selectedYear}
            onChange={onYearChange}
            className={styles.filterSelect}
          >
            <option value="">Filtrar por Ano</option>
            {years && years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={selectedPrice}
            onChange={onPriceChange}
            className={styles.filterSelect}
          >
            <option value="">Filtrar por Preço</option>
            <option value="10">Até R$10</option>
            <option value="20">Até R$20</option>
            <option value="50">Até R$50</option>
            <option value="100">Até R$100</option>
          </select>
        </div>
      )}

      {/* --- Grupo Inferior: Botão de Logout --- */}
      <div className={styles.bottomSection}>
        <button
          onClick={onLogout}
          className={`${styles.navLink} ${styles.logoutButton}`}
        >
          <ExitToAppIcon />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;

