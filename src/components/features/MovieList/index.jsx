
import MovieCard from '../../layout/MovieCard/index.jsx';

import styles from './MovieList.module.css';

function MovieList({ movies, onMovieClick }) {
  return (
    <div className={styles.moviesGrid}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.idfilme}
            movie={movie}
            onClick={() => onMovieClick(movie)}
          />
        ))
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}

export default MovieList;
