import SideBar from '../../layout/SideBar/index.jsx';

import styles from './AdminLayout.module.css';


function AdminLayout({ children }) {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/'; 
  };

  return (
    <div className={styles.adminLayout}>
      <SideBar 
        userProfile={{ username: 'Admin' }} 
        onLogout={handleLogout} 
        showFilters={false} 
      />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;