import { NextRouter, useRouter } from "next/dist/client/router";
import { useState } from "react";

import { Container, Division, LineBar } from "../styles/components/appBar";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setPersonFilter, setSortFilter } from "../state/reducers";
import { CustomInput, CustomMenu, CustomSelect, Heading } from ".";
import { ROUTE_NAMES, SORT_FILTER_LABELS } from "../helpers";

export interface IProps {
  heading: string;
  hasGroupFilter?: boolean;
  hasSortFilter?: boolean;
  hasMonthPicker?: boolean;
}

export const AppBarMenu: React.FC<IProps> = ({
  heading,
  hasGroupFilter,
  hasSortFilter,
  hasMonthPicker,
}) => {
  const links: string[] = ROUTE_NAMES.filter(
    (link) => link.toLocaleLowerCase() !== heading.toLocaleLowerCase()
  );
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
    console.log(e);
    dispatch(setSortFilter(e.target.value));
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
          {hasSortFilter && (
            <CustomSelect
              label={"sort-filter-select"}
              value={sortFilter}
              onChange={selectSortFilter}
              list={SORT_FILTER_LABELS}
            />
          )}

          {hasGroupFilter && (
            <CustomSelect
              label={"group-select"}
              value={personFilter}
              onChange={selectPersonFilter}
              list={["Group", "Person1", "Person2"]}
            />
          )}

          {hasMonthPicker && (
            <CustomInput
              type="month"
              value={chosenDate}
              onChange={handleMonthpicker}
            />
          )}
        </Division>
      </Container>
    </LineBar>
  );
};
