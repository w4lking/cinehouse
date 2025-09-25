
import { useState, useEffect, useMemo } from "react";
import ApiService from "../../services/apiService.js"; 

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Lógica para o modal de edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getUsuarios();
      if (response?.status === "success") {
        setUsers(response.data);
      }
    } catch (err) {
      setError("Falha ao carregar utilizadores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm(`Tem a certeza que deseja apagar o utilizador com ID ${userId}?`)) {
      try {
        await ApiService.deletarUsuario(userId);
        // Atualiza a lista de utilizadores removendo o que foi apagado
        setUsers(prevUsers => prevUsers.filter(user => user.idusuario !== userId));
      } catch (err) {
        setError("Falha ao apagar utilizador.");
      }
    }
  };
  
  const handleUpdateUser = async (updatedUserData) => {
    try {
      await ApiService.alterarUsuario(updatedUserData.idusuario, updatedUserData.nome, updatedUserData.email, updatedUserData.dataNasc);
      // Atualiza a lista localmente para refletir a mudança
      setUsers(prevUsers => prevUsers.map(user => user.idusuario === updatedUserData.idusuario ? updatedUserData : user));
      closeEditModal(); // Fecha o modal
    } catch(err) {
      setError("Falha ao atualizar utilizador.");
    }
  };

  const filteredUsers = useMemo(() =>
    users.filter(user =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ), [users, searchTerm]);

  // Funções de controlo do modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  return {
    users: filteredUsers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    handleDeleteUser,
    handleUpdateUser,
    isEditModalOpen,
    selectedUser,
    openEditModal,
    closeEditModal
  };
}