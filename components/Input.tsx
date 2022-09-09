import { FormInput } from "../styles/global";

export interface IProps {
  type: string;
  value?: string | number;
  onChange: any;
  label?: string;
  autoComplete?: string;
}

export const CustomInput: React.FC<IProps> = ({
  value,
  onChange,
  label,
  type,
  autoComplete,
}) => {
  return (
    <FormInput
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
};
