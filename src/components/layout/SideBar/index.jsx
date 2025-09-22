import { useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar({ userProfile, onLogout, selectedYear, onYearChange, years, selectedPrice, onPriceChange }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <aside className={styles.sidebar}>
       <ul>
        {userProfile === "cliente" && (
          <li>
            <button onClick={() => handleNavigate("/UserSettings")}>Perfil</button>
          </li>
        )}
        {userProfile === "funcionario" && (
          <li>
            <button className={styles.relatorio} onClick={() => handleNavigate("/adm")}>
              Dashboard
            </button>
          </li>
        )}
        <li><button onClick={onLogout}>Sair</button></li>
      </ul>

      <div className={styles.filters}>
        <h3>Filtros</h3>
        <select
          value={selectedYear}
          onChange={onYearChange}
          className={styles.filterSelect}
        >
          <option value="">Filtrar por Ano</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
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
    </aside>
  );
}

export default SideBar;
