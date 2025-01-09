import React, { useState, useEffect } from 'react';
import './Recover.css'; // importando estilizacao css

const Recover = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = 'Recuperar Acesso'; // hook para alterar titulo da aba
    // Adiciona a classe ao body quando o componente é montado
    document.body.classList.add('recover-page');

    // Remove a classe do body quando o componente é desmontado
    return () => {
      document.body.classList.remove('recover-page');
    };
  }, []);

  const handleRecover = (e) => {
    e.preventDefault();
    // Lógica de recuperação de conta aqui
  };

  return (
    <div className="recovery-container">
      <h2>Recuperar Conta</h2>
      <form onSubmit={handleRecover}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
          />
        </div>
        <button type="submit">Recuperar conta</button>
      </form>
    </div>
  );
};

export default Recover;