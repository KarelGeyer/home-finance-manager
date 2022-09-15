import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";

import { getDate } from "../../helpers";
import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_USER,
  UPDATE_TRANSACTION,
} from "../../graphql";

import {
  CustomButton,
  CustomCheckbox,
  CustomInput,
  CustomSelect,
  Heading,
  Transaction,
} from "../../components";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { TransactionGrid } from "../../styles/pages/transactions";
import { Form } from "../../styles/global";
import { Loan } from "../overview";

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

const Transactions: React.FC = () => {
  const [isNewTransaction, setIsNewTransaction] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [loans, setLoans] = useState<any>();

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

  const cleanLoans: Loan[] =
    loans &&
    loans.filter((loan) => {
      const loanYear = loan.date.split("-")[0];
      const loanMonth = loan.date.split("-")[1];

      const thisMonthLoan =
        parseInt(loanYear) == parseInt(chosenDate.split("-")[0]) &&
        parseInt(loanMonth) == parseInt(chosenDate.split("-")[1]);

      return thisMonthLoan;
    });

  const sortedLoans: Loan[] = useMemo(() => {
    if (cleanLoans) {
      if (sortFilter === "Date") {
        return cleanLoans.sort((loan_1, loan_2) => {
          const date_1: number = parseInt(loan_1.date.split("-")[2]);
          const date_2: number = parseInt(loan_2.date.split("-")[2]);
          return date_1 - date_2;
        });
      }

      if (sortFilter === "Amount") {
        return cleanLoans.sort((loan_1, loan_2) => {
          return loan_1.sum - loan_2.sum;
        });
      }

      if (sortFilter === "User") {
        return cleanLoans.sort((loan_1, loan_2) => {
          //@ts-ignore
          return loan_1.person.name - loan_2.person.name;
        });
      }
    }
  }, [sortFilter, cleanLoans]);

  console.log(sortedLoans);

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
    let loans: Loan[] = [];
    const teamData = transactionsData?.user.team;
    teamData &&
      teamData.forEach((user) => {
        user.transactions.forEach((transaction) => {
          transactions.push(transaction);
        });
        user.loans.forEach((transaction) => {
          loans.push(transaction);
        });
      });

    setTransactions(transactions);
    setLoans(loans);
    setTransactionDetails({
      ...transactionDetails,
      personId: userData && userData.user.accountID,
    });
  }, [transactionsData, transactionsRefetch, userEmail, userData]);

  const handleTransaction = (): void => {
    const { id, name, currency, category, sum, isLoan, personId, date } =
      transactionDetails;
    if (name == "" || id == "" || category == "" || sum == 0) {
      return;
    }

    const token = localStorage?.getItem("ref_sh_tkn");
    if (!token) {
      // THIS WILL NEED TO HAVE SOME LOGIC
      console.log("missing token");
    }

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
    <>
      <TransactionGrid item xs={12} md={5}>
        <Heading variant="h3">Transactions</Heading>
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
        <Heading variant="h3">Selected Transaction</Heading>
        <Form component="form">
          <CustomInput
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
          <CustomInput
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
          <CustomInput
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
          <CustomInput
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
          <CustomSelect
            label="currency-select-label"
            value={transactionDetails.currency}
            //@ts-ignore
            onChange={(e: { target: { value: CURRENCY } }) =>
              setTransactionDetails({
                ...transactionDetails,
                currency: e.target.value,
              })
            }
            list={["CZK", "EUR"]}
          />
          <CustomCheckbox
            isChecked={true}
            onChange={(e) => setIsNewTransaction(e.target.checked)}
            label="Is New"
          />
          <CustomButton
            type="button"
            variant="contained"
            size="medium"
            onClick={handleTransaction}
            btnColor="primary"
            isSingle={true}
          >
            submit
          </CustomButton>
        </Form>
      </Grid>
    </>
  );
};

export default Transactions;
