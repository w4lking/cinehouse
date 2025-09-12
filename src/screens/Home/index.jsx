
import { useMovies } from '../../components/hooks/useMoves';
import { useModal } from '../../components/hooks/useModal';
import { useAuth } from '../../components/hooks/useAuth';

import NavBar from '../../components/layout/NavBar/index.jsx';
import SideBar from '../../components/layout/SideBar/index.jsx';
import MovieList from '../../components/features/MovieList/index.jsx';
import MovieModal from '../../components/features/MovieModal/index.jsx';

import styles from './Home.module.css';

function Home() {
  const {
    filteredFilmes,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    selectedYear,
    setSelectedYear,
    selectedPrice,
    setSelectedPrice,
    genres,
    years
  } = useMovies();

  const { isModalOpen, selectedMovie, handleOpenModal, handleCloseModal } = useModal();
  const { userProfile, handleLogout } = useAuth();

  return (
    <div className={styles.appLayout}>
      <NavBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        selectedGenre={selectedGenre}
        onGenreChange={(e) => setSelectedGenre(e.target.value)}
        genres={genres}
      />
      <div className={styles.mainContainer}>
        <SideBar
          userProfile={userProfile}
          onLogout={handleLogout}
          selectedYear={selectedYear}
          onYearChange={(e) => setSelectedYear(e.target.value)}
          years={years}
          selectedPrice={selectedPrice}
          onPriceChange={(e) => setSelectedPrice(e.target.value)}
        />
        <main className={styles.content}>
          <MovieList movies={filteredFilmes} onMovieClick={handleOpenModal} />
        </main>
      </div>
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Home;

