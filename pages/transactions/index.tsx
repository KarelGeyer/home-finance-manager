import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";

import CancelIcon from "@mui/icons-material/Cancel";

import AppBarMenu from "../../components/AppBar";
import LineGraph from "../../components/LineGraph";
import Transaction, {
  IProps as TransactionProps,
} from "../../components/Transaction";

import {
  GridContainer,
  ButtonWithIcon,
  ButtonWithIconTypography,
  TransactionGrid,
  FilterSelect,
} from "../../styles/pages/transactions";
import { Section, MainHeading, FormBox } from "../../styles/global";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TRANSACTIONS_URL } from "../../assets/global";
import EditTransaction from "../../components/EditTransaction";

export interface IProps {
  transactions: Transaction[];
}

export interface Transaction {
  name: string;
  person: string;
  category: string;
  sum: number;
  currency: string;
  month?: string;
  isLoand?: boolean;
  tags?: string | string[];
  __v?: number;
  _id: string;
}

const Transactions: React.FC<IProps> = ({ transactions }) => {
  const [filterValue, setFilterValue] = useState<string>("Group");
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = (): void => setModalOpened(true);
  const closeModal = (): void => setModalOpened(false);

  const links: string[] = ["overview", "account", "calculator"];

  const selectFilter = (e: any) => {
    setFilterValue(e.target.value);
  };

  const formattedDatesFromTransactions: string[] = transactions.map(
    (transaction: any) => {
      const formatterdDateArr = transaction.date.split("-");

      return `${formatterdDateArr[2]}.${formatterdDateArr[1]}`;
    }
  );

  const spendings: number[] = transactions.map(
    (transaction: any) => transaction.sum
  );

  return (
    <Section sx={{ fontFamily: "Montserrat" }}>
      <AppBarMenu
        heading="Transactions"
        group={true}
        monthPicker={true}
        links={links}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ButtonWithIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openModal}
          >
            <AddCircleIcon fontSize="large" />
            <ButtonWithIconTypography variant="subtitle1">
              Add New
            </ButtonWithIconTypography>
          </ButtonWithIcon>
        </Box>

        <FilterSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="Sort by"
          value={filterValue}
          onChange={selectFilter}
        >
          <MenuItem value="Group"> Date </MenuItem>
          <MenuItem value="Person 1"> Amount </MenuItem>
          <MenuItem value="Person 2"> User </MenuItem>
        </FilterSelect>
      </AppBarMenu>

      <GridContainer container sx={{ padding: "20px" }}>
        <TransactionGrid item xs={12} md={5}>
          <MainHeading variant="h4">Transactions</MainHeading>
          <Box sx={{ overflow: "scroll", overflowX: "hidden" }}>
            {transactions &&
              transactions.map((transaction: any) => (
                <Transaction
                  name={transaction.name}
                  user={transaction.person}
                  price={transaction.sum}
                  tags={transaction.tags}
                  id={transaction._id}
                  key={transaction._id}
                />
              ))}
          </Box>
        </TransactionGrid>

        <Grid
          item
          xs={12}
          md={7}
          sx={{ textAlign: "center", paddingTop: "20px" }}
        >
          <MainHeading variant="h4">Spendings By Day</MainHeading>
          <Box sx={{ height: "400px" }}>
            <LineGraph
              labels={formattedDatesFromTransactions}
              data={spendings}
            />
          </Box>
        </Grid>
      </GridContainer>

      <Modal
        open={modalOpened}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormBox component="form">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ButtonWithIconTypography variant="h5">
              Edit Account
            </ButtonWithIconTypography>
            <ButtonWithIcon
              onClick={closeModal}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <CancelIcon />
            </ButtonWithIcon>
          </Box>
          <EditTransaction closeModal={closeModal} />
        </FormBox>
      </Modal>
    </Section>
  );
};

export const getServerSideProps = async (): Promise<any> => {
  const res: Response = await fetch(TRANSACTIONS_URL);
  const transactions: IProps = await res.json();

  return {
    props: {
      transactions,
    },
  };
};

export default Transactions;
