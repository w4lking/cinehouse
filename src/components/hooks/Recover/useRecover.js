import { useState } from "react";

import ApiService from "../../../services/apiService"; 

export function useRecover() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecover = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await ApiService.recuperarSenha(email);
      setMessage(response.message || "Instruções enviadas para o seu e-mail!");
      setIsError(false);
      setEmail(""); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Não foi possível processar a solicitação.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    message,
    isError,
    isLoading,
    handleRecover,
  };
}