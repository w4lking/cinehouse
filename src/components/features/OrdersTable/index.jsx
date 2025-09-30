
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StatusBadge from '../StatusBadge';

import styles from './OrdersTable.module.css';

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

function OrdersTable({ orders, onExtend, onReturn, onViewDetails }) {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table aria-label="Histórico de Pedidos">
        <TableHead>
          <TableRow>
            <TableCell>ID Pedido</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Devolução</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.idpedido} hover>
              <TableCell component="th" scope="row">
                #{order.idpedido}
              </TableCell>
              <TableCell>{formatDate(order.dataPedido)}</TableCell>
              <TableCell>{order.tipoPedido}</TableCell>
              <TableCell><StatusBadge status={order.statusPedido} /></TableCell>
              <TableCell>{formatDate(order.dataLimiteLocacao)}</TableCell>
              <TableCell align="right">R$ {Number(order.valorTotal).toFixed(2)}</TableCell>
              <TableCell align="center" className={styles.actions}>
                <IconButton size="small" onClick={() => onViewDetails(order.idpedido)}>
                    <InfoIcon fontSize="small" />
                </IconButton>
                {order.tipoPedido === 'Alocacao' && !['Finalizado', 'Devolvido', 'Estendido'].includes(order.statusPedido) && (
                  <>
                    <Button size="small" onClick={() => onExtend(order.idpedido, order.dataLimiteLocacao)}>Estender</Button>
                    <Button size="small" variant="outlined" onClick={() => onReturn(order.idpedido)}>Devolver</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrdersTable;

