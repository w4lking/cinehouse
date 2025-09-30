import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function OrderDetailsModal({ isOpen, onClose, isLoading, details }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Detalhes do Pedido
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : details ? (
          <div>
            <Typography><strong>Filme:</strong> {details.nomeFilme}</Typography>
            <Typography><strong>Quantidade:</strong> {details.quantidade}</Typography>
            <Typography><strong>Preço Unitário:</strong> R$ {Number(details.precoUnitario).toFixed(2)}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}><strong>Valor Total:</strong> R$ {Number(details.valorTotal).toFixed(2)}</Typography>
          </div>
        ) : (
          <Typography color="error">Não foi possível carregar os detalhes.</Typography>
        )}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Fechar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default OrderDetailsModal;

