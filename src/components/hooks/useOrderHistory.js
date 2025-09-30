import { useState, useEffect } from "react";
import ApiService from "../../services/apiService.js";


export function useOrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para o modal de detalhes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.getHistorico();
      if (response?.status === "success") {
        setOrders(response.data);
      }
    } catch (err) {
      setError("Falha ao carregar o histórico de pedidos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openDetailsModal = async (orderId) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    try {
      const response = await ApiService.getPedidoById(orderId);
      if (response?.status === "success" && response.data.length > 0) {
        setSelectedOrderDetails(response.data[0]);
      }
    } catch (err) {
      // Tratar erro no modal
    } finally {
      setIsModalLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails(null);
  };

  const handleExtendOrder = async (orderId, returnDate) => {
    try {
      const newDate = new Date(returnDate);
      newDate.setDate(newDate.getDate() + 3);
      await ApiService.EstenderPedido(orderId, "Estendido", newDate.toISOString().split('T')[0]);
      fetchOrders(); // Recarrega a lista para mostrar o novo estado
    } catch (err) {
      alert("Erro ao estender o pedido.");
    }
  };

  const handleReturnOrder = async (orderId) => {
    try {
      await ApiService.devolverPedido(orderId, "Devolvido");
      fetchOrders(); // Recarrega a lista
    } catch (err) {
      alert("Erro ao devolver o pedido.");
    }
  };

  return {
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
  };
}
