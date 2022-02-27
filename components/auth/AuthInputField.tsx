import { FunctionComponent } from "react";
import { StyledTextField } from "../../lib/styled/StyledTextField";

export interface AuthInputFieldProps {
  label: string;
  error: boolean;
  type: string;
  helperText: string | null | undefined;
  fieldName: () => void;
}

const AuthInputField: FunctionComponent<AuthInputFieldProps> = ({
  label,
  error,
  type,
  helperText,
  fieldName,
}) => {
  return (
    <StyledTextField
      label={label}
      error={error}
      type={type}
      fullWidth
      helperText={helperText}
      {...fieldName()}
      className="mb-3"
    />
  );
};

export default AuthInputField;
