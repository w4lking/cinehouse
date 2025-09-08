import { TextField } from "@mui/material";
import styles from './InputField.module.css';

// Este componente aceita todas as props do TextField original (...rest)
// e adiciona a nossa classe de estilo personalizada.
function InputField({ ...rest }) {
  return (
    <TextField
      className={styles.textField}
      variant="filled"
      fullWidth
      required
      {...rest} // Repassa todas as props (label, value, onChange, etc.)
    />
  );
}

export default InputField;