import { NextRouter, useRouter } from "next/dist/client/router";
import { Container, Division, LineBar } from "../styles/components/appBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setPersonFilter,
  setSortFilter,
  setTransactionTypeFilter,
} from "../state/reducers";
import { CustomInput, CustomMenu, CustomSelect, Heading } from ".";
import {
  ROUTE_NAMES,
  SORT_FILTER_LABELS,
  SORT_TRANSACTION_TYPES,
  SORT_USERS,
} from "../helpers";

export interface IProps {
  heading: string;
  hasGroupFilter?: boolean;
  hasSortFilter?: boolean;
  hasMonthPicker?: boolean;
  hastransactionTypeFilter?: boolean;
}

export const AppBarMenu: React.FC<IProps> = ({
  heading,
  hasGroupFilter,
  hasSortFilter,
  hasMonthPicker,
  hastransactionTypeFilter,
}) => {
  const links: string[] = ROUTE_NAMES.filter(
    (link) => link.toLocaleLowerCase() !== heading.toLocaleLowerCase()
  );
  const router: NextRouter = useRouter();
  const { chosenDate, personFilter, sortFilter, transactionTypeFilter } =
    //@ts-ignore
    useSelector((state) => state.baseData);

  const dispatch = useDispatch();

  const selectPersonFilter = (e: any): void => {
    dispatch(setPersonFilter(e.target.value));
  };

  const selectSortFilter = (e: any): void => {
    dispatch(setSortFilter(e.target.value));
  };

  const handleMonthpicker = (e: any): void => {
    dispatch(setDate(e.target.value));
  };

  const selectTransactionTypeFilter = (e: any): void => {
    dispatch(setTransactionTypeFilter(e.target.value));
  };
  const navigateTo = (e: any): void => {
    const link: string = e.target.innerText.toLowerCase();

    if (link.length >= 1) {
      router.push(`/${link}`);
    }
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

          {hastransactionTypeFilter && (
            <CustomSelect
              label={"group-select"}
              value={transactionTypeFilter}
              onChange={selectTransactionTypeFilter}
              list={SORT_TRANSACTION_TYPES}
            />
          )}

          {hasGroupFilter && (
            <CustomSelect
              label={"group-select"}
              value={personFilter}
              onChange={selectPersonFilter}
              list={SORT_USERS}
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
