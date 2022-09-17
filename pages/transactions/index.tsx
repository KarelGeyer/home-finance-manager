import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";

import { setTransaction } from "../../state/reducers";
import { setLoan } from "../../state/reducers/loan";

import { CURRENCY } from "../../types/enums";

import { sortData, SORT_TRANSACTION_TYPES } from "../../helpers";

import {
  changeLoan,
  changeTransaction,
  createLoan,
  createTransaction,
  CREATE_LOAN,
  CREATE_TRANSACTION,
  GET_TEAM_LOANS,
  GET_TEAM_TRANSACTIONS,
  GET_USER,
  UPDATE_LOAN,
  UPDATE_TRANSACTION,
} from "../../graphql";

import {
  CustomButton,
  CustomCheckbox,
  CustomInput,
  CustomSelect,
  CustomTab,
  Heading,
  Loan as LoanComponent,
  Transaction,
} from "../../components";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { TransactionGrid } from "../../styles/pages/transactions";
import { Form } from "../../styles/global";

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("0");
  const dispatch = useDispatch();

  const {
    chosenDate,
    userEmail,
    sortFilter,
    transactionTypeFilter,
    teamIds,
  }: {
    chosenDate: string;
    userEmail: string;
    sortFilter: string;
    transactionTypeFilter: string;
    teamIds: string[] | string;
    //@ts-ignore
  } = useSelector((state) => state.baseData);
  //@ts-ignore
  const transactionState = useSelector((state) => state.transaction);
  //@ts-ignore
  const loanState = useSelector((state) => state.loan);
  console.log(loanState);

  const { data: teamLoansData, refetch: teamLoansRefetch } = useQuery(
    GET_TEAM_LOANS,
    { variables: { ids: teamIds } }
  );

  const { data: teamTransactionsData, refetch: teamTransactionsRefetch } =
    useQuery(GET_TEAM_TRANSACTIONS, { variables: { ids: teamIds } });

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

  const loans = useMemo(() => {
    return (
      teamLoansData?.teamLoans &&
      sortData({
        data: teamLoansData.teamLoans,
        dataType: "Loan",
        chosenDate,
        filter: sortFilter,
      })
    );
  }, [teamLoansData, sortFilter, chosenDate]);

  const transactions = useMemo(() => {
    return (
      teamTransactionsData?.teamTransactions &&
      sortData({
        data: teamTransactionsData?.teamTransactions,
        dataType: "Loan",
        chosenDate,
        filter: sortFilter,
      })
    );
  }, [teamTransactionsData, sortFilter, chosenDate]);

  useEffect(() => {
    setActiveTab("0");
    userRefetch();
    teamLoansRefetch();
    teamTransactionsRefetch();

    dispatch(
      setTransaction({
        ...transactionState,
        personId: userData && userData.user.accountID,
      })
    );
    dispatch(
      setLoan({
        ...loanState,
        personId: userData && userData.user.accountID,
      })
    );
  }, [teamLoansRefetch, teamTransactionsRefetch, userRefetch]);

  const formLabels = [SORT_TRANSACTION_TYPES[1], SORT_TRANSACTION_TYPES[2]];
  const forms = [
    <TransactionDetailsForm
      teamTransactionsRefetch={teamTransactionsRefetch}
      key={1}
    />,
    <LoanDetailsForm teamLoansRefetch={teamLoansRefetch} key={2} />,
  ];

  return (
    <>
      <TransactionGrid item xs={12} md={5}>
        <Heading variant="h3">Transactions</Heading>
        <Box sx={{ overflow: "scroll", overflowX: "hidden" }}>
          {transactions?.dataBySort &&
            (transactionTypeFilter === "All" ||
              transactionTypeFilter === "Transactions") &&
            transactions.dataBySort.map((transaction: any) => (
              <Transaction
                transaction={transaction}
                key={transaction.id}
                teamTransactionsRefetch={teamTransactionsRefetch}
                setUpdateVisible={setActiveTab}
              />
            ))}
          {loans?.dataBySort &&
            (transactionTypeFilter === "All" ||
              transactionTypeFilter === "Loans") &&
            loans.dataBySort.map((loan: any) => (
              <LoanComponent
                loan={loan}
                key={loan.id}
                loansRefetch={teamLoansRefetch}
                setUpdateVisible={setActiveTab}
              />
            ))}
        </Box>
      </TransactionGrid>
      <Grid
        item
        xs={12}
        md={7}
        sx={{ textAlign: "center", padding: "40px 70px" }}
      >
        <CustomTab
          labelsList={formLabels}
          childrenList={forms}
          activeTab={activeTab}
        />
      </Grid>
    </>
  );
};

const TransactionDetailsForm = ({ teamTransactionsRefetch }) => {
  const [isNew, setIsNew] = useState<boolean>(true);
  const [createTransactionMutation] = useMutation(CREATE_TRANSACTION);
  const [updateTransactionMutation] = useMutation(UPDATE_TRANSACTION);
  //@ts-ignore
  const transactionState = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  return (
    <>
      <Heading variant="h3">Transaction</Heading>
      <Form component="form">
        <CustomInput
          label="Name"
          type="text"
          value={transactionState.name}
          onChange={(e) => {
            dispatch(
              setTransaction({
                ...transactionState,
                name: e.target.value,
              })
            );
          }}
        />
        <CustomInput
          label="Category"
          type="text"
          value={transactionState.category}
          onChange={(e) => {
            dispatch(
              setTransaction({
                ...transactionState,
                category: e.target.value,
              })
            );
          }}
        />
        <CustomInput
          label="Sum"
          type="number"
          value={transactionState.sum}
          onChange={(e) => {
            dispatch(
              setTransaction({
                ...transactionState,
                sum: parseInt(e.target.value),
              })
            );
          }}
        />
        <CustomInput
          label="Date"
          type="date"
          value={transactionState.date}
          onChange={(e) => {
            dispatch(
              setTransaction({
                ...transactionState,
                date: e.target.value,
              })
            );
          }}
        />
        <CustomSelect
          label="currency-select-label"
          value={transactionState.currency}
          //@ts-ignore
          onChange={(e: { target: { value: CURRENCY } }) => {
            dispatch(
              setTransaction({
                ...transactionState,
                currency: e.target.value,
              })
            );
          }}
          list={["CZK", "EUR"]}
        />
        <CustomCheckbox
          isChecked={isNew}
          onChange={() => setIsNew(!isNew)}
          label="Is new"
        />
        {isNew ? (
          <CustomButton
            type="button"
            variant="contained"
            size="medium"
            onClick={() =>
              createTransaction({
                transactionState,
                createTransactionMutation,
                teamTransactionsRefetch,
              })
            }
            btnColor="primary"
            isSingle={true}
          >
            Submit New
          </CustomButton>
        ) : (
          <CustomButton
            type="button"
            variant="contained"
            size="medium"
            onClick={() =>
              changeTransaction({
                transactionState,
                updateTransactionMutation,
                teamTransactionsRefetch,
              })
            }
            btnColor="primary"
            isSingle={true}
          >
            Change Transaction
          </CustomButton>
        )}
      </Form>
    </>
  );
};

const LoanDetailsForm = ({ teamLoansRefetch }) => {
  const [isNew, setIsNew] = useState<boolean>(true);
  const [updateLoanMutation] = useMutation(UPDATE_LOAN);
  const [createLoanMutation] = useMutation(CREATE_LOAN);
  //@ts-ignore
  const loanState = useSelector((state) => state.loan);
  const dispatch = useDispatch();

  return (
    <>
      <Heading variant="h3">Loan</Heading>
      <Form component="form">
        <CustomInput
          label="Name"
          type="text"
          value={loanState.name}
          onChange={(e) => {
            dispatch(
              setLoan({
                ...loanState,
                name: e.target.value,
              })
            );
          }}
        />
        <CustomInput
          label="Sum"
          type="number"
          value={loanState.sum}
          onChange={(e) => {
            dispatch(
              setLoan({
                ...loanState,
                sum: parseInt(e.target.value),
              })
            );
          }}
        />
        <CustomInput
          label="Date"
          type="date"
          value={loanState.date}
          onChange={(e) => {
            dispatch(
              setLoan({
                ...loanState,
                date: e.target.value,
              })
            );
          }}
        />
        <CustomSelect
          label="currency-select-label"
          value={loanState.currency}
          //@ts-ignore
          onChange={(e: { target: { value: CURRENCY } }) => {
            dispatch(
              setLoan({
                ...loanState,
                currency: e.target.value,
              })
            );
          }}
          list={["CZK", "EUR"]}
        />
        <CustomCheckbox
          isChecked={loanState.isPayed}
          onChange={(e) => {
            dispatch(
              setLoan({
                ...loanState,
                isPayed: e.target.checked,
              })
            );
          }}
          label="Is Payed"
        />
        <CustomCheckbox
          isChecked={isNew}
          onChange={() => setIsNew(!isNew)}
          label="Is new"
        />
        {isNew ? (
          <CustomButton
            type="button"
            variant="contained"
            size="medium"
            onClick={() =>
              createLoan({ loanState, createLoanMutation, teamLoansRefetch })
            }
            btnColor="primary"
            isSingle={true}
          >
            Submit New
          </CustomButton>
        ) : (
          <CustomButton
            type="button"
            variant="contained"
            size="medium"
            onClick={() =>
              changeLoan({ loanState, updateLoanMutation, teamLoansRefetch })
            }
            btnColor="primary"
            isSingle={true}
          >
            Change Loan
          </CustomButton>
        )}
      </Form>
    </>
  );
};

export default Transactions;
