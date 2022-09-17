import { Dispatch, SetStateAction } from "react";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { setTransaction } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";

import { Transaction as TransactionType } from "../types/types";

import { deleteTransaction, DELETE_TRANSACTION } from "../graphql";

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
  transaction: TransactionType;
  setUpdateVisible: Dispatch<SetStateAction<any>>;
  teamTransactionsRefetch: (
    variables?: Partial<{
      ids: string | string[];
    }>
  ) => Promise<ApolloQueryResult<any>>;
}

export const Transaction: React.FC<IProps> = ({
  transaction,
  setUpdateVisible,
  teamTransactionsRefetch,
}) => {
  const { id, name, person, sum, category, currency, date } = transaction;
  const personName = `${person.name} ${person.surname}`;
  const [deleteMutation, { data: data, error: deleteError }] =
    useMutation(DELETE_TRANSACTION);
  //@ts-ignore
  const transactionState = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const chooseTransaction = () => {
    dispatch(
      setTransaction({
        ...transactionState,
        id,
        name,
        category,
        sum,
        currency,
      })
    );
    setUpdateVisible("0");
  };

  return (
    <TransactionCard>
      <TransactionActionsBox>
        <Box>
          <Badge label={category} color="red" />
        </Box>
        <Box>
          <CustomButton
            type="icon"
            size="large"
            iconColor="inherit"
            label="edit transaction"
            onClick={chooseTransaction}
          >
            <EditIcon />
          </CustomButton>
          <CustomButton
            type="icon"
            size="large"
            iconColor="inherit"
            aria-label="delete transaction"
            onClick={() =>
              deleteTransaction({
                //@ts-ignore
                transactionState: transaction,
                deleteMutation,
                teamTransactionsRefetch,
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
        <Paragraph variant="subtitle1">{personName}</Paragraph>
        <CustomDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{sum}</Paragraph>
        <CustomDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{date}</Paragraph>
      </TransactionContentBox>
    </TransactionCard>
  );
};
