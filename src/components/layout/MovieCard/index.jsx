import styles from './MovieCard.module.css';
// mover para features, pois estou na branch
const genreMap = {
    1: "Drama", 2: "Ação", 3: "Comédia", 4: "Suspense",
    5: "Aventura", 6: "Terror", 7: "Mistério", 8: "Crime",
};

function MovieCard({ movie, onClick }) {
    const classificationText = movie.classificacaoIndicativa === 0 ? "Livre" : `${movie.classificacaoIndicativa}+`;
    const genreText = genreMap[movie.categoria_idcategoria] || "Desconhecido";

    return (
        <div className={styles.movieContainer} onClick={onClick}>
            <img src={movie.imagem} alt={movie.nomeFilme} className={styles.movieImage} />
            <div className={styles.movieInfo}>
                <h4 className={styles.movieTitle}>{movie.nomeFilme}</h4>
                <p>{movie.ano}, {genreText}</p>
                <p>Classificação: {classificationText}</p>
            </div>
        </div>
    );
}

export default MovieCard;
