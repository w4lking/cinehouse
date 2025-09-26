
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/apiService.js"; 

export function useUserSettings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    street: "",
    houseNumber: "",
    neighborhood: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Efeito para carregar os dados do utilizador quando o componente montar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("id"); // ou de um contexto de autenticação
        if (userId) {
          const userData = await ApiService.getUserData(userId);
          setFormData(prev => ({ ...prev, ...userData }));
        }
      } catch (err) {
        setError("Não foi possível carregar os seus dados.");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const userId = sessionStorage.getItem("id");
      const response = await ApiService.updateUserData(userId, formData);
      setSuccess(response.message);
    } catch (err) {
      setError("Erro ao salvar as alterações.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Tem a certeza que deseja apagar a sua conta? Esta ação é irreversível.")) {
      setIsLoading(true);
      try {
        const userId = sessionStorage.getItem("id");
        await ApiService.deleteUserAccount(userId);
        alert("Conta apagada com sucesso.");
        navigate('/'); 
      } catch (err) {
        setError("Erro ao apagar a conta.");
        setIsLoading(false);
      }
    }
  };

  return {
    formData,
    handleChange,
    handleSaveChanges,
    handleDeleteAccount,
    isLoading,
    success,
    error,
  };
}
