import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSettings.css';

const UserSettings = ({ userName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Editar perfil'; // hook para alterar titulo da aba
    document.body.classList.add('user-settings-page');
    return () => {
      document.body.classList.remove('user-settings-page');
    };
  }, []);

  const handleSaveChanges = (e) => {
    e.preventDefault();
  };

  const handleGoBack = () => {
    window.history.back(); // Lógica para voltar à página anterior, vai pegar a URL anterior e redirecionar para ela
  };

  const handleDeleteAccount = () => {
    navigate();
  };

  return (
    <div className="user-settings-container1">
      <h2>Edição de informações</h2>
      <form onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label className="label-editar-user"htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label-editar-user" htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label-editar-user" htmlFor="street">Rua</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className="form-group house-number-container">
          <div>
            <label className="label-editar-user" htmlFor="houseNumber">N° Casa</label>
            <input
              type="text"
              id="houseNumber"
              className="house-number"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label-editar-user" htmlFor="neighborhood">Bairro</label>
            <input
              type="text"
              id="neighborhood"
              className="neighborhood"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="label-editar-user" htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={handleDeleteAccount}>Deletar conta</button>
        </div>
        <div className="centered-button-group">
          <button type="button" onClick={handleGoBack}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;