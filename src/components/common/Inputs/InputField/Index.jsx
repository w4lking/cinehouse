import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./InputField.module.css";

function InputField({ type = "text", ...rest }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Se for senha, adiciona o botão do olho no final
  const isPassword = type === "password";

  return (
    <TextField
      className={styles.textField}
      variant="filled"
      fullWidth
      required
      type={isPassword && showPassword ? "text" : type}
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    className={styles.iconButton}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
      {...rest} // Repassa label, value, onChange, etc.
    />
  );
}

export default InputField;
