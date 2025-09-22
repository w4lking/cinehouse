
import { useState } from "react";
import ApiService from "../../../../services/apiService"; 

export function useCreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

    try {
      // Usando o padrão de objeto único que definimos
      const userData = { username, email, birthDate, password, cpf: "" }; // Enviando CPF vazio como no código original
      const response = await ApiService.registerUser(userData);

      setSuccess(response.message || "Usuário criado com sucesso!");
      // Limpa os campos após o sucesso
      setUsername("");
      setEmail("");
      setBirthDate("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username, setUsername,
    email, setEmail,
    birthDate, setBirthDate,
    password, setPassword,
    error,
    success,
    isLoading,
    handleSubmit,
  };
}