
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './MoviesTable.module.css';

function MoviesTable({ movies, onEdit, onDelete }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Título</th>
            <th>Ano</th>
            <th>Estoque</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.idfilme}>
              <td><img src={movie.imagem} alt={movie.nomeFilme} className={styles.poster}/></td>
              <td>{movie.nomeFilme}</td>
              <td>{new Date(movie.dataLancamento).getFullYear()}</td>
              <td>{movie.qtdEstoque}</td>
              <td>R$ {movie.precoCompra.toFixed(2)}</td>
              <td className={styles.actions}>
                <IconButton size="small" onClick={() => onEdit(movie)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="primary" onClick={() => onDelete(movie.idfilme)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoviesTable;
