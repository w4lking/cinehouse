import React, { useState, useEffect } from 'react';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Registro'; // hook para alterar titulo da aba
    // Adiciona a classe ao body quando o componente é montado
    document.body.classList.add('register-page');

    // Remove a classe do body quando o componente é desmontado
    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário para o backend
  };

  const handleGoBack = () => {
    // Lógica para voltar à página anterior, vai pegar a URL anterior e redirecionar para ela
    window.history.back();
  };

  return (
    <div className="register-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Nome Completo</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Data de Nascimento</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <button onClick={handleGoBack}>Voltar</button> {/* Adiciona o botão "Voltar" */}
    </div>
  );
};

export default Register;