import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@apollo/client";

import { DELETE_TRANSACTION, GET_TRANSACTIONS } from "../graphql";

import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  TransactionActionsBox,
  TransactionCard,
  TransactionContentBox,
} from "../styles/components/transaction";
import { Badge, CustomButton, Paragraph } from ".";
import { CustomDivider } from "./Divider";

export interface IProps {
  name: string;
  user: {
    name: string;
    surname: string;
  };
  price: number;
  category: string;
  isLoan: boolean;
  currency: string;
  id: string;
  date: string;
  setTransactionDetails: Dispatch<SetStateAction<any>>;
  transactionDetails: any;
  transactionsRefetch: Function;
}

export const Transaction: React.FC<IProps> = ({
  id,
  name,
  user,
  price,
  category,
  currency,
  isLoan,
  date,
  setTransactionDetails,
  transactionDetails,
  transactionsRefetch,
}) => {
  const personName = `${user.name} ${user.surname}`;
  const [deleteMutation, { data: data, error: deleteError }] =
    useMutation(DELETE_TRANSACTION);

  const chooseTransaction = () => {
    setTransactionDetails({
      ...transactionDetails,
      id,
      name,
      category,
      sum: price,
      currency,
    });
  };

  const deleteTransaction = () => {
    const token = localStorage?.getItem("ref_sh_tkn");

    deleteMutation({
      variables: {
        transaction: {
          id,
          name,
          category,
          sum: price,
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
    transactionsRefetch();
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
            onClick={deleteTransaction}
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
        <Paragraph variant="subtitle1">{price}</Paragraph>
        <CustomDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{date}</Paragraph>
      </TransactionContentBox>
    </TransactionCard>
  );
};
