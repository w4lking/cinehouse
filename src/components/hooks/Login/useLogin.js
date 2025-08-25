// Fiz esse arquivo pra manter toda a LÓGICA do login e separar da screen.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../../services/apiService"; 

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await ApiService.loginUser(email, password);

      if (response.ok) {
        // ... salvar os outros dados necessários
        // sessionStorage.setItem("id", response.idusuario);
        // sessionStorage.setItem("cliente", response.idcliente);
        // sessionStorage.setItem("perfil", response.perfil);
        sessionStorage.setItem("token", response.token);
        navigate("/navigation");
      } else {
        setError(response.message || "Credenciais incorretas. Tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
}