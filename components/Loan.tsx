import { Dispatch, SetStateAction } from "react";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setLoan } from "../state/reducers/loan";

import { Loan as LoanType } from "../types/types";

import { deleteLoan, DELETE_TRANSACTION } from "../graphql";

import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Badge, CustomButton, Paragraph } from ".";
import { CustomDivider } from "./Divider";

import {
  TransactionActionsBox,
  TransactionCard,
  TransactionContentBox,
} from "../styles/components/transaction";

export interface IProps {
  loan: LoanType;
  setUpdateVisible: Dispatch<SetStateAction<any>>;
  loansRefetch: (
    variables?: Partial<{
      ids: string | string[];
    }>
  ) => Promise<ApolloQueryResult<any>>;
}

export const Loan: React.FC<IProps> = ({
  loan,
  setUpdateVisible,
  loansRefetch,
}) => {
  const {
    id,
    name,
    creditor,
    debtor,
    sum,
    currency,
    date,
    isPayed,
    debtorEmail,
    creditorEmail,
  } = loan;
  const creditorName = `${creditor?.name} ${creditor?.surname}`;
  const debtorName = `${debtor?.name} ${debtor?.surname}`;
  const [deleteMutation, { data: data, error: deleteError }] =
    useMutation(DELETE_TRANSACTION);
  //@ts-ignore
  const loanState = useSelector((state) => state.loan);
  const dispatch = useDispatch();

  const chooseLoan = () => {
    dispatch(
      setLoan({
        ...loanState,
        name,
        creditorEmail,
        debtorEmail,
        id,
        isPayed,
        sum,
        currency,
        date,
      })
    );

    setUpdateVisible("1");
  };

  return (
    <TransactionCard>
      <TransactionActionsBox>
        <Box>
          <Badge label={"LOAN"} color="red" />
        </Box>
        <Box>
          <CustomButton
            type="icon"
            size="large"
            iconColor="inherit"
            label="edit transaction"
            onClick={chooseLoan}
          >
            <EditIcon />
          </CustomButton>
          <CustomButton
            type="icon"
            size="large"
            iconColor="inherit"
            aria-label="delete transaction"
            onClick={() =>
              deleteLoan({
                //@ts-ignore
                loanState: loan,
                deleteMutation,
                teamLoansRefetch: loansRefetch,
              })
            }
          >
            <DeleteIcon />
          </CustomButton>
        </Box>
      </TransactionActionsBox>
      <TransactionContentBox>
        <Paragraph variant="subtitle1">{name}</Paragraph>
      </TransactionContentBox>
      <TransactionContentBox>
        <Paragraph variant="subtitle1">{creditorName}</Paragraph>
        <CustomDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{debtorName}</Paragraph>
      </TransactionContentBox>
      <TransactionContentBox>
        <Paragraph variant="subtitle1">{sum}</Paragraph>
        <CustomDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{date}</Paragraph>
      </TransactionContentBox>
    </TransactionCard>
  );
};
