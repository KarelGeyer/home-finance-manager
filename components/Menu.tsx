import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomButton } from ".";

export interface IProps {
  list: string[] | number[];
  onClick: any;
}

export const CustomMenu: React.FC<IProps> = ({ list, onClick }) => {
  const [anchorEl, setAnchorEl] = useState<Element>(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (e: any): void => {
    if (!open) {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  return (
    <CustomButton
      onClick={toggleMenu}
      size="large"
      type="icon"
      iconColor="inherit"
      label="menu"
    >
      <MenuIcon />
      <Menu id="menu" anchorEl={anchorEl} onClick={onClick} open={open}>
        {list.map((item: any) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </CustomButton>
  );
};
