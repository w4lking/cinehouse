
import { useState, useEffect } from 'react';
// import { Grow } from '@mui/material'; 

import styles from './AuthFormContainer.module.css';

function AuthFormContainer({ title, children, links }) {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoaded(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

  return (
    // <Grow in={isLoaded} timeout={700}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <h2 className={styles.title}>{title}</h2>
          {children}
        </div>
        <div className={styles.links}>
          {links}
        </div>
      </div>
    // </Grow>
  );
}

export default AuthFormContainer;
