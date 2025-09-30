import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/hooks/useAuth.js'; 
import SideBar from '../SideBar/index.jsx';

import styles from './UserLayout.module.css';

function UserLayout({ children }) {
  const { userProfile, handleLogout } = useAuth();

  return (
    <div className={styles.layout}>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default UserLayout;

