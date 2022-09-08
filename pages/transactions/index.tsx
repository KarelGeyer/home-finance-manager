import { useEffect, useMemo, useState } from "react";

import AppBarMenu from "../../components/AppBar";
import Transaction, {
  IProps as TransactionProps,
} from "../../components/Transaction";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

import {
  GridContainer,
  TransactionGrid,
} from "../../styles/pages/transactions";
import {
  Section,
  MainHeading,
  Form,
  FormInput,
  FormButton,
  FormSelect,
} from "../../styles/global";

import { getDate } from "../../helpers";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_USER,
  UPDATE_TRANSACTION,
} from "../../graphql";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";

export interface IProps {
  transactions: Transaction[];
}

export interface Transaction {
  name: string;
  person: {
    name: string;
  };
  category: string;
  sum: number;
  date: string;
  currency: string;
  month?: string;
  isLoan?: boolean;
  tags?: string | string[];
  __v?: number;
  _id: string;
}

export interface TransactionDetails {
  id: string;
  name: string;
  category: string;
  sum: number;
  currency: CURRENCY;
  isLoan?: boolean;
  date?: string;
  personId: string;
}

export enum CURRENCY {
  CZK = "CZK",
  EUR = "EUR",
}

const Transactions: React.FC<IProps> = () => {
  const links: string[] = ["overview", "account", "calculator"];

  const [filterValue, setFilterValue] = useState<string>("Group");
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isNewTransaction, setIsNewTransaction] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>();

  const {
    chosenDate,
    userEmail,
    sortFilter,
  }: { chosenDate: string; userEmail: string; sortFilter: string } =
    useSelector((state) => state.baseData);

  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails>({
      id: "",
      name: "",
      category: "",
      sum: 0,
      isLoan: false,
      date: getDate().fullDate,
      currency: CURRENCY.CZK,
      personId: "",
    });

  const {
    loading: isFetchingTransactions,
    error: transactionsError,
    data: transactionsData,
    refetch: transactionsRefetch,
  } = useQuery(GET_TRANSACTIONS, {
    variables: {
      email: userEmail,
    },
  });

  const {
    loading: isFetchingUser,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(GET_USER, {
    variables: {
      email: userEmail,
    },
  });

  const [updateMutation, { data: updateData, error: updateError }] =
    useMutation(UPDATE_TRANSACTION);

  const [createMutation, { data: createData, error: createError }] =
    useMutation(CREATE_TRANSACTION);

  const cleanTransactions: Transaction[] =
    transactions &&
    transactions.filter((transaction) => {
      const transactionYear = transaction.date.split("-")[0];
      const transactionMonth = transaction.date.split("-")[1];

      const thisMonthTransaction =
        parseInt(transactionYear) == parseInt(chosenDate.split("-")[0]) &&
        parseInt(transactionMonth) == parseInt(chosenDate.split("-")[1]);

      return thisMonthTransaction;
    });

  const sortedData: Transaction[] = useMemo(() => {
    if (cleanTransactions) {
      if (sortFilter === "Date") {
        return cleanTransactions.sort((transaction_1, transaction_2) => {
          const date_1: number = parseInt(transaction_1.date.split("-")[2]);
          const date_2: number = parseInt(transaction_2.date.split("-")[2]);
          return date_1 - date_2;
        });
      }

      if (sortFilter === "Amount") {
        return cleanTransactions.sort((transaction_1, transaction_2) => {
          return transaction_1.sum - transaction_2.sum;
        });
      }

      if (sortFilter === "User") {
        return cleanTransactions.sort((transaction_1, transaction_2) => {
          //@ts-ignore
          return transaction_1.person.name - transaction_2.person.name;
        });
      }
    }
  }, [sortFilter, cleanTransactions]);

  useEffect(() => {
    transactionsRefetch();
    userRefetch();

    let transactions: Transaction[] = [];
    const teamData = transactionsData?.user.team;
    teamData &&
      teamData.forEach((user) => {
        user.transactions.forEach((transaction) => {
          transactions.push(transaction);
        });
      });

    setTransactions(transactions);
    setTransactionDetails({
      ...transactionDetails,
      personId: userData && userData.user.accountID,
    });
  }, [transactionsData, transactionsRefetch, userEmail, userData]);

  const handleTransaction = (): void => {
    const { id, name, currency, category, sum, isLoan, personId, date } =
      transactionDetails;
    const token = localStorage?.getItem("ref_sh_tkn");

    if (isNewTransaction) {
      createMutation({
        variables: {
          transaction: {
            name,
            category,
            sum,
            currency,
            date,
            isLoan,
            personId,
          },
        },
        context: {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        },
        refetchQueries: [{ query: GET_TRANSACTIONS }],
      });
    } else {
      updateMutation({
        variables: {
          transaction: {
            id,
            name,
            category,
            sum,
            date,
            currency,
            isLoan,
          },
        },
        context: {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        },
        refetchQueries: [{ query: GET_TRANSACTIONS }],
      });
    }

    transactionsRefetch();
  };

  return (
    <Section sx={{ fontFamily: "Montserrat" }}>
      <AppBarMenu heading="Transactions" group={true} monthPicker={true} />
      <GridContainer container sx={{ padding: "20px" }}>
        <TransactionGrid item xs={12} md={5}>
          <MainHeading variant="h4">Transactions</MainHeading>
          <Box sx={{ overflow: "scroll", overflowX: "hidden" }}>
            {sortedData &&
              sortedData.map((transaction: any, index: number) => (
                <Transaction
                  name={transaction.name}
                  user={transaction.person}
                  price={transaction.sum}
                  category={transaction.category}
                  currency={transaction.currency}
                  isLoan={transaction.isLoan}
                  date={transaction.date}
                  id={transaction.id}
                  key={transaction.id}
                  transactionDetails={transactionDetails}
                  setTransactionDetails={setTransactionDetails}
                  transactionsRefetch={transactionsRefetch}
                />
              ))}
          </Box>
        </TransactionGrid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{ textAlign: "center", padding: "160px 70px" }}
        >
          <MainHeading variant="h4">Selected Transaction</MainHeading>
          <Form component="form">
            <FormInput
              label="Name"
              type="text"
              value={transactionDetails.name}
              onChange={(e) => {
                setTransactionDetails({
                  ...transactionDetails,
                  name: e.target.value,
                });
              }}
            />
            <FormInput
              label="Category"
              type="text"
              value={transactionDetails.category}
              onChange={(e) => {
                setTransactionDetails({
                  ...transactionDetails,
                  category: e.target.value,
                });
              }}
            />
            <FormInput
              label="Sum"
              type="number"
              value={transactionDetails.sum}
              onChange={(e) => {
                setTransactionDetails({
                  ...transactionDetails,
                  sum: parseInt(e.target.value),
                });
              }}
            />
            <FormInput
              label="Date"
              type="date"
              value={transactionDetails.date}
              onChange={(e) => {
                setTransactionDetails({
                  ...transactionDetails,
                  date: e.target.value,
                });
              }}
            />
            <FormSelect
              labelId="currency-select-label"
              id="currency-select"
              defaultValue="Select Currency"
              value={transactionDetails.currency}
              onChange={(e: { target: { value: CURRENCY } }) => {
                setTransactionDetails({
                  ...transactionDetails,
                  currency: e.target.value,
                });
              }}
            >
              <MenuItem value={CURRENCY.CZK}>CZK</MenuItem>
              <MenuItem value={CURRENCY.EUR}>EUR</MenuItem>
            </FormSelect>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    setTransactionDetails({
                      ...transactionDetails,
                      isLoan: e.target.checked,
                    })
                  }
                />
              }
              label="Is Loan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={(e) => setIsNewTransaction(e.target.checked)}
                />
              }
              label="Is New"
            />
            <FormButton variant="contained" onClick={handleTransaction}>
              submit
            </FormButton>
          </Form>
        </Grid>
      </GridContainer>
    </Section>
  );
};

export default Transactions;
