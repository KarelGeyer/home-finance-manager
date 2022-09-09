import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export interface IProps {
  isChecked: boolean;
  onChange: any;
  label?: string;
}

export const CustomCheckbox: React.FC<IProps> = ({
  isChecked,
  onChange,
  label,
}) => {
  return (
    <FormControlLabel
      defaultChecked={isChecked}
      label={label}
      control={<Checkbox onChange={onChange} />}
    />
  );
};
