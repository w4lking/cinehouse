
import { useNavigate } from 'react-router-dom';
import { useOrderHistory } from '../../../components/hooks/useOrderHistory.js';

import UserLayout from '../../../components/layout/UserLayout/index.jsx';
import OrdersTable from '../../../components/features/OrdersTable/index.jsx';
import OrderDetailsModal from '../../../components/features/OrderDetailsModal/index.jsx';
import { Button, CircularProgress, Typography } from '@mui/material';

import styles from './OrderHistoryPage.module.css';

function OrderHistoryPage() {
  const navigate = useNavigate();
  const {
    orders,
    isLoading,
    error,
    isModalOpen,
    isModalLoading,
    selectedOrderDetails,
    openDetailsModal,
    closeModal,
    handleExtendOrder,
    handleReturnOrder,
  } = useOrderHistory();

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Histórico de Pedidos</h1>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress />
            <Typography>A carregar histórico...</Typography>
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <OrdersTable 
            orders={orders}
            onExtend={handleExtendOrder}
            onReturn={handleReturnOrder}
            onViewDetails={openDetailsModal}
          />
        )}

        {isModalOpen && (
           <OrderDetailsModal 
            isOpen={isModalOpen}
            onClose={closeModal}
            isLoading={isModalLoading}
            details={selectedOrderDetails}
          />
        )}
      </div>
    </UserLayout>
  );
}

export default OrderHistoryPage;

