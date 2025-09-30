import { Chip } from '@mui/material';

function StatusBadge({ status }) {
  const statusConfig = {
    'Pendente': { color: 'warning', label: 'Pendente' },
    'Finalizado': { color: 'success', label: 'Finalizado' },
    'Devolvido': { color: 'info', label: 'Devolvido' },
    'Estendido': { color: 'secondary', label: 'Estendido' },
    'Cancelado': { color: 'error', label: 'Cancelado' }
  };

  const config = statusConfig[status] || { color: 'default', label: status };

  return <Chip label={config.label} color={config.color} size="small" />;
}

export default StatusBadge;

