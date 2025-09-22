import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../../components/hooks/Create/User/useCreateUser.js";

// Importando componentes
import AdminLayout from "../../../components/layout/AdminLayout/index.jsx";
import InputField from "../../../components/common/Inputs/InputField/Index.jsx";
import Alert from "../../../components/common/Alert/index.jsx";
import ActionCard from '../../../components/layout/admin/ActionCard/index.jsx';
import { Button } from "@mui/material";

import styles from './CreateUserPage.module.css';

function CreateUserPage() {
  const navigate = useNavigate();
  const {
    username, setUsername,
    email, setEmail,
    birthDate, setBirthDate,
    password, setPassword,
    error,
    success,
    isLoading,
    handleSubmit,
  } = useCreateUser();

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </div>

        <div className={styles.formWrapper}>
          <ActionCard title="Adicionar Novo Usuário" icon={null}>
            {success && <Alert type="success" message={success} />}
            {error && <Alert type="error" message={error} />}

            <form onSubmit={handleSubmit}>
              <InputField className={styles.inputField}
                label="Nome de Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <InputField className={styles.inputField}
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputField className={styles.inputField}
                label="Data de Nascimento"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
              <InputField className={styles.inputField}
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconProps={{ sx: { color: '#1e88e5', backgroundColor: 'transparent', border: 'none' }, disableRipple: true, 'aria-label': 'toggle password' }}
                iconClassName={styles.customIcon}
              />
              <Button className={styles.buttonGroup}
                type="submit"
                variant="outlined"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? "Criando..." : "Criar Usuário"}
              </Button>
            </form>
          </ActionCard>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateUserPage;

