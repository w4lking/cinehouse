
import { useNavigate } from 'react-router-dom';
import styles from './ActionCard.module.css';

function ActionCard({ title, icon, actions = [] }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {icon}
        <h3>{title}</h3>
      </div>
      <div className={styles.cardBody}>
        {actions.map((action) => (
          <button key={action.label} onClick={() => navigate(action.path)}>
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActionCard;