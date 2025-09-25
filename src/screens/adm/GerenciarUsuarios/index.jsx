import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../components/hooks/useUsers.js'; 

// Componentes
import AdminLayout from '../../../components/layout/AdminLayout/index.jsx';
import UsersTable from '../../../components/layout/admin/UsersTable/index.jsx';
import { Button, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import EditUserModal from '../../../components/admin/EditUserModal'; // Componente para o popup

import styles from './ManageUsersPage.module.css';

function ManageUsersPage() {
  const navigate = useNavigate();
  const {
    users,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    handleDeleteUser,
    // ...resto das funções do hook para o modal
  } = useUsers();

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Gerir Utilizadores</h1>
          <Button 
            variant="contained" 
            startIcon={<PersonAddIcon />} 
            onClick={() => navigate('/adm/criarUsuario')}
          >
            Adicionar Utilizador
          </Button>
        </div>
        
        <div className={styles.toolbar}>
          <TextField
            label="Pesquisar por nome..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>A carregar utilizadores...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <UsersTable users={users} onDelete={handleDeleteUser} onEdit={() => { /* Lógica para abrir modal */}} />
        )}

        {/* Aqui iria o seu componente de Modal para edição, controlado pelo estado do hook */}
        {/* <EditUserModal isOpen={isEditModalOpen} onClose={closeEditModal} user={selectedUser} onSave={handleUpdateUser} /> */}
      </div>
    </AdminLayout>
  );
}

export default ManageUsersPage;