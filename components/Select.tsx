import { MenuItem } from "@mui/material";
import { FormSelect } from "../styles/global";

export interface IProps {
  value: string | number;
  onChange: any;
  list: string[] | number[];
  label?: string;
}

export const CustomSelect: React.FC<IProps> = ({
  value,
  onChange,
  list,
  label,
}) => {
  return (
    <FormSelect
      labelId={label}
      id="simple-select"
      value={value}
      onChange={onChange}
    >
      {list &&
        list.map((item: string | number) => {
          return (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          );
        })}
    </FormSelect>
  );
};
