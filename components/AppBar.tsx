import { NextRouter, useRouter } from "next/dist/client/router";
import { ReactFragment, useContext, useState } from "react";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Paragraph } from "../styles/global";
import { LineBar, MenuSelect } from "../styles/components/appBar";
import { TransactionContext } from "../state/context/transactionContext";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setPersonFilter, setSortFilter } from "../state/reducers";
import { FilterSelect } from "../styles/pages/transactions";

interface IProps {
  heading: string;
  group?: boolean;
  monthPicker?: boolean;
  children?: ReactFragment;
}

const AppBarMenu: React.FC<IProps> = ({
  heading,
  group,
  monthPicker,
  children,
}) => {
  const links: string[] = [
    "Overview",
    "Account",
    "Calculator",
    "Transactions",
  ].filter((link) => link.toLocaleLowerCase() !== heading.toLocaleLowerCase());
  const router: NextRouter = useRouter();
  const [selectValue, setSelectValue] = useState<string>("Group");
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const { chosenDate, personFilter, sortFilter } = useSelector(
    (state) => state.baseData
  );

  const dispatch = useDispatch();

  const selectPersonFilter = (e: any): void => {
    dispatch(setPersonFilter(e.target.value));
  };

  const selectSortFilter = (e: any): void => {
    dispatch(setSortFilter(e.target.value));
  };

  const toggleMenu = (e: any): void => {
    if (!open) {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const navigateTo = (e: any): void => {
    const link: string = e.target.innerText.toLowerCase();

    if (link.length >= 1) {
      router.push(`/${link}`);
    }
  };

  const handleMonthpicker = (e: any): void => {
    dispatch(setDate(e.target.value));
  };

  return (
    <LineBar position="static" color="secondary">
      <Toolbar>
        <IconButton
          onClick={toggleMenu}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            onClick={navigateTo}
            open={open}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {links.map((link: any) => (
              <MenuItem value={link} key={link}>
                {link}
              </MenuItem>
            ))}
          </Menu>
        </IconButton>
        <Paragraph variant="h6" sx={{ flexGrow: 1 }}>
          {heading}
        </Paragraph>

        {sortFilter && (
          <FilterSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="Sort by"
            value={sortFilter || "Date"}
            onChange={selectSortFilter}
          >
            <MenuItem value="Date"> Date </MenuItem>
            <MenuItem value="Amount"> Amount </MenuItem>
            <MenuItem value="User"> User </MenuItem>
          </FilterSelect>
        )}

        {group && (
          <MenuSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={personFilter || "Group"}
            onChange={selectPersonFilter}
          >
            <MenuItem value="Group"> Group </MenuItem>
            <MenuItem value="Person 1"> Person 1 </MenuItem>
            <MenuItem value="Person 2"> Person 2 </MenuItem>
          </MenuSelect>
        )}
        {monthPicker && (
          <input
            type="month"
            className="monthPicker"
            defaultValue={chosenDate}
            onChange={handleMonthpicker}
          />
        )}
      </Toolbar>
    </LineBar>
  );
};

export default AppBarMenu;
