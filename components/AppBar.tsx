import { NextRouter, useRouter } from "next/dist/client/router";
import { ReactFragment, useState } from "react";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Paragraph } from "../styles/global";
import { LineBar, MenuSelect } from "../styles/components/appBar";

interface IProps {
  heading: string;
  group?: boolean;
  monthPicker?: boolean;
  children?: ReactFragment;
  links: string[];
}

const AppBarMenu: React.FC<IProps> = ({
  heading,
  group,
  monthPicker,
  children,
  links,
}) => {
  const router: NextRouter = useRouter();
  const [selectValue, setSelectValue] = useState<string>("Group");
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleSelect = (e: any): void => {
    setSelectValue(e.target.value);
  };

  const toggleMenu = (e: any): void => {
    if (!open) {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const closeMenu = (): void => {
    setAnchorEl(null);
  };

  const navigateTo = (e: any): void => {
    const link: string = e.target.innerText.toLowerCase();

    if (link.length >= 1) {
      router.push(`/${link}`);
    }
  };

  return (
    <LineBar position="static" color="secondary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <MenuIcon />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            onClick={navigateTo}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {links.map((link: any) => (
              <MenuItem value={link} key={link}>
                {" "}
                {link}{" "}
              </MenuItem>
            ))}
          </Menu>
        </IconButton>
        <Paragraph variant="h6" sx={{ flexGrow: 1 }}>
          {heading}
        </Paragraph>

        {children}

        {group && (
          <MenuSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectValue}
            onChange={handleSelect}
          >
            <MenuItem value="Group"> Group </MenuItem>
            <MenuItem value="Person 1"> Person 1 </MenuItem>
            <MenuItem value="Person 2"> Person 2 </MenuItem>
          </MenuSelect>
        )}
        {monthPicker && <input type="month" className="monthPicker" />}
      </Toolbar>
    </LineBar>
  );
};

export default AppBarMenu;
