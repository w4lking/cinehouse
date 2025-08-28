import { useState } from "react";
import ApiService from "../../../services/apiService";

const validateCpf = (cpf) => {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
};

export function useRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!validateCpf(cpf)) {
      setError("CPF inválido. Use o formato 000.000.000-00.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await ApiService.registerUser({ username, cpf, email, birthDate, password });
      setSuccess(response.message || "Usuário registrado com sucesso!");
      // Limpa os campos
      setUsername("");
      setEmail("");
      setCpf("");
      setBirthDate("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao registrar usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username, setUsername,
    email, setEmail,
    cpf, setCpf,
    birthDate, setBirthDate,
    password, setPassword,
    error,
    success,
    isLoading,
    handleSubmit,
  };
}