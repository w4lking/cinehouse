import styles from './NavBar.module.css';

function NavBar({ searchTerm, onSearchChange, selectedGenre, onGenreChange, genres }) {
  return (
    <header className={styles.mainHeader}>
      <nav className={styles.navLinks}>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={onSearchChange}
        />
        <select
          value={selectedGenre}
          onChange={onGenreChange}
          className={styles.filterSelect}
        >
          <option value="">Todos os Gêneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button className={styles.cartButton}>
          🛒 (0)
        </button>
      </nav>
    </header>
  );
}

export default NavBar;

