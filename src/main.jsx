import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './screens/Login/Login.css'; // css do login
import App from './App'; // Importando o App que gerencia as rotas

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);