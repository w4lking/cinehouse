
import AdminLayout from '../../components/layout/AdminLayout';
import ActionCard from '../../components/layout/admin/ActionCard/index.jsx';
import { ADMIN_ROUTES } from '../../config/adminRoutes.js'; // 1. Importa as rotas

// Ícones
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import SettingsIcon from '@mui/icons-material/Settings';

import styles from './AdminDashboardPage.module.css';

// 2. Usa as rotas importadas em vez de texto
const userActions = [
  { label: 'Adicionar Utilizador', path: ADMIN_ROUTES.CREATE_USER, icon: <PersonAddIcon /> },
  { label: 'Visualizar Utilizadores', path: ADMIN_ROUTES.MANAGE_USERS, icon: <ManageAccountsIcon /> },
];
const reportActions = [
  { label: 'Relatório de Vendas/Aluguéis', path: ADMIN_ROUTES.REPORTS_SALES, icon: <ReceiptLongIcon /> },
  { label: 'Relatório de Devoluções', path: ADMIN_ROUTES.REPORTS_RETURNS, icon: <AssignmentReturnIcon /> },
];
const movieActions = [
  { label: 'Acessar Gestão', path: ADMIN_ROUTES.MANAGE_MOVIES, icon: <SettingsIcon /> },
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
