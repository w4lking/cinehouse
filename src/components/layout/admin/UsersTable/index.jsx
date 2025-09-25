
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './UsersTable.module.css';

function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Nasc.</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.idusuario}>
              <td>{user.idusuario}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{new Date(user.dataNasc).toLocaleDateString()}</td>
              <td className={styles.actions}>
                <Button variant="text" size="small" startIcon={<EditIcon />} onClick={() => onEdit(user)}>
                  Editar
                </Button>
                <Button variant="text" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(user.idusuario)}>
                  Apagar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;