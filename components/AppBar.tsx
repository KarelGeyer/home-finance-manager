import { NextRouter, useRouter } from "next/dist/client/router";
import { ReactFragment, useState } from "react";

import { Container, Division, LineBar } from "../styles/components/appBar";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setPersonFilter, setSortFilter } from "../state/reducers";
import { Box } from "@mui/material";
import { CustomMenu, CustomSelect, Heading } from ".";

export interface IProps {
  heading: string;
  group?: boolean;
  monthPicker?: boolean;
  children?: ReactFragment;
}

export const AppBarMenu: React.FC<IProps> = ({
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
  const [anchorEl, setAnchorEl] = useState<Element>(null);
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
      <Container>
        <Division>
          <CustomMenu list={links} onClick={navigateTo} />
          <Heading variant="h5">{heading}</Heading>
        </Division>
        <Division>
          {sortFilter && (
            <CustomSelect
              label={"sort-filter-select"}
              value={sortFilter}
              onChangeEvent={selectSortFilter}
              list={["Date", "Amount", "User"]}
            />
          )}

          {group && (
            <CustomSelect
              label={"group-select"}
              value={personFilter}
              onChangeEvent={selectPersonFilter}
              list={["Group", "Person1", "Person2"]}
            />
          )}

          {monthPicker && (
            <input
              type="month"
              className="monthPicker"
              defaultValue={chosenDate}
              onChange={handleMonthpicker}
            />
          )}
        </Division>
      </Container>
    </LineBar>
  );
};
