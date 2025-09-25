
import { useNavigate } from 'react-router-dom';
import { useManageMovies } from '../../../components/hooks/useManageMovies';

import AdminLayout from '../../../components/layout/AdminLayout';
import MoviesTable from '../../../components/layout/admin/MoviesTable/index.jsx';
import MovieFormModal from '../../../components/layout/admin/MovieFormModal/index.jsx';
import { Button, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styles from './ManageMoviesPage.module.css';

function ManageMoviesPage() {
  const navigate = useNavigate();
  const {
    movies,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    handleDeleteMovie,
    handleUpsertMovie,
    isModalOpen,
    editingMovie,
    openModal,
    closeModal
  } = useManageMovies();

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Gerir Filmes</h1>
          <Button 
            variant="contained" 
            startIcon={<AddCircleOutlineIcon />} 
            onClick={() => openModal()} 
          >
            Adicionar Filme
          </Button>
        </div>
        
        <div className={styles.toolbar}>
          <TextField
            label="Pesquisar por título..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>A carregar filmes...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <MoviesTable 
            movies={movies} 
            onDelete={handleDeleteMovie} 
            onEdit={openModal} 
          />
        )}

        {isModalOpen && (
          <MovieFormModal 
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleUpsertMovie}
            movie={editingMovie}
            categories={categories}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default ManageMoviesPage;

