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
      label={label}
      control={<Checkbox checked={isChecked} onChange={onChange} />}
    />
  );
};
