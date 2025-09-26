
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ApiService from "../../services/apiService"; 

export function useResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem. Tente novamente.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      // Usando uma simulação para testes, substitua pela chamada real
      const response = await ApiService.resetPassword(email, token, password);
      console.log("Simulando reset de senha para:", { email, token, password });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula a demora da rede

      setMessage("Sua senha foi atualizada com sucesso! A redirecionar...");
      setTimeout(() => navigate("/"), 3000); // Redireciona para o login

    } catch (error) {
      setMessage("Erro ao atualizar a senha. Verifique o link ou tente novamente.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    token,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    isError,
    isLoading,
    handleSubmit,
  };
}
