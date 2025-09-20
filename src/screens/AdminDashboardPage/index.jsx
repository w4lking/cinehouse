
import AdminLayout from '../../components/layout/AdminLayout';
import ActionCard from '../../components/layout/admin/ActionCard';


// Ícones para os cards
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import SettingsIcon from '@mui/icons-material/Settings';

import styles from './AdminDashboardPage.module.css';

const userActions = [
  { label: 'Adicionar Utilizador', path: '/adm/criar-usuario', icon: <PersonAddIcon /> },
  { label: 'Visualizar Utilizadores', path: '/adm/gerenciar-usuarios', icon: <ManageAccountsIcon /> },
];
const reportActions = [
  { label: 'Relatório de Vendas/Aluguéis', path: '/adm/relatorio/vendas', icon: <ReceiptLongIcon /> },
  { label: 'Relatório de Devoluções', path: '/adm/relatorio/devolucoes', icon: <AssignmentReturnIcon /> },
];
const movieActions = [
  { label: 'Acessar Gestão', path: '/adm/gerenciar-filmes', icon: <SettingsIcon /> },
];


function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>Dashboard Administrativo</h1>
        <div className={styles.cardsGrid}>
          <ActionCard title="Gerir Utilizadores" icon={<GroupIcon />} actions={userActions} />
          <ActionCard title="Gerar Relatórios" icon={<AssessmentIcon />} actions={reportActions} />
          <ActionCard title="Gestão de Filmes" icon={<TheatersIcon />} actions={movieActions} />
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;