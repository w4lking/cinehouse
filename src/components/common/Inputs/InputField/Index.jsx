
import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./InputField.module.css";

function InputField({ type = "text", iconProps = {}, iconClassName, renderAdornment, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(prev => !prev);
  const isPassword = type === "password";

  const defaultAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={handleTogglePassword}
        edge="end"
        className={`${styles.iconButton} ${iconClassName || ''}`}
        {...iconProps}     
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

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
              endAdornment: renderAdornment ? renderAdornment({ showPassword, toggle: handleTogglePassword }) : defaultAdornment,
            }
          : {}
      }
      {...rest}
    />
  );
}

export default InputField;
