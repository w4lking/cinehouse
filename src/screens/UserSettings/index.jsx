import { useNavigate } from 'react-router-dom';
import { useUserSettings } from '../../components/hooks/useUserSettings.js';

// Componentes
import UserLayout from '../../components/layout/UserLayout/index.jsx'; // 1. MUDANÇA AQUI
import InputField from '../../components/common/Inputs/InputField/Index.jsx';
import Alert from '../../components/common/Alert/index.jsx';
import { Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

import styles from './UserSettingsPage.module.css';

function UserSettingsPage() {
  const navigate = useNavigate();
  const {
    formData,
    handleChange,
    handleSaveChanges,
    handleDeleteAccount,
    isLoading,
    success,
    error
  } = useUserSettings();

  return (
    <UserLayout> {/* 2. MUDANÇA AQUI */}
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Configurações da Conta</h1>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </div>

        {success && <Alert type="success" message={success} />}
        {error && <Alert type="error" message={error} />}

        <form onSubmit={handleSaveChanges}>
          {/* Card de Informações da Conta */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <AccountCircleIcon />
              <h3>Informações da Conta</h3>
            </div>
            <div className={styles.cardBody}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField
                    label="E-mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                   <InputField
                    type="password"
                    label="Nova Senha"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          {/* Card de Endereço */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <HomeIcon />
              <h3>Endereço</h3>
            </div>
            <div className={styles.cardBody}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField
                    label="Rua"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputField
                    label="N° Casa"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={8}>
                  <InputField
                    label="Bairro"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    label="Cidade"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className={styles.actionsContainer}>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'A Salvar...' : 'Salvar Alterações'}
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleDeleteAccount}
              disabled={isLoading}
            >
              Apagar Conta
            </Button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
}

export default UserSettingsPage;

