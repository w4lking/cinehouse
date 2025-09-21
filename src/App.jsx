
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ADMIN_ROUTES } from './config/adminRoutes'; // 1. Importa as rotas
import { USER_ROUTES } from './config/userRoutes'; 
import { PUBLIC_ROUTES} from './config/publicRoutes';

// Importação das páginas.
import LoginPage from "./screens/Login/index.jsx";
import Recover from "./screens/Recover/index.jsx";
import RegisterPage from "./screens/Register/index.jsx";
import Home from "./screens/Home/index.jsx";
import UserSettings from "./screens/UserSettings/UserSettings";
import Admin from "./screens/AdminDashboardPage/index.jsx";
import Relatorio from "./screens/Relatorios/AluguelEVenda/Relatorio";
import HistPedidos from "./screens/HistPedidos/histPedidos";
import GerenciarUsuarios from "./screens/adm/GerenciarUsuarios/index.jsx";
import RelatorioDevolucao from "./screens/Relatorios/Devolucoes/Relatorio";
import CriarUsuario from "./screens/adm/CriarUsuario/index.jsx";
import GerenciarFilme from "./screens/adm/GerenciarFilme/index.jsx";
import RecuperarSenha from "./screens/RecuperarSenha/RecuperarSenha.jsx"


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={PUBLIC_ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={PUBLIC_ROUTES.RECOVER} element={<Recover />} />
        {/* ... */}
        
        {/* Rotas Administrativas - AGORA USANDO AS CONSTANTES */}
        <Route path={ADMIN_ROUTES.DASHBOARD} element={<Admin />} />
        <Route path={ADMIN_ROUTES.CREATE_USER} element={<CriarUsuario />} />
        <Route path={ADMIN_ROUTES.MANAGE_USERS} element={<GerenciarUsuarios />} />
        <Route path={ADMIN_ROUTES.MANAGE_MOVIES} element={<GerenciarFilme />} />
        <Route path={ADMIN_ROUTES.REPORTS_SALES} element={<Relatorio />} />
        <Route path={ADMIN_ROUTES.REPORTS_RETURNS} element={<RelatorioDevolucao />} />
        {/* Rotas do Usuário */}
        <Route path={USER_ROUTES.HOME} element={<Home />} />
        <Route path={USER_ROUTES.SETTINGS} element={<UserSettings />} />
        <Route path={USER_ROUTES.ORDER_HISTORY} element={<HistPedidos />} />
        <Route path={USER_ROUTES.RECOVER_PASSWORD} element={<RecuperarSenha />} />

        
        {/* ... resto das suas rotas */}
      </Routes>
    </Router>
  );
};

export default App;





