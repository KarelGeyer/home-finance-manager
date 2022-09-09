import { MenuItem } from "@mui/material";
import { MenuSelect } from "../styles/components/select";

export interface IProps {
  value: string | number;
  onChangeEvent: any;
  list: string[] | number[];
  label?: string;
}

export const CustomSelect: React.FC<IProps> = ({
  value,
  onChangeEvent,
  list,
  label,
}) => {
  return (
    <MenuSelect
      labelId={label}
      id="simple-select"
      value={value}
      onChange={onChangeEvent}
    >
      {list &&
        list.map((item: string | number) => {
          return (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          );
        })}
    </MenuSelect>
  );
};
