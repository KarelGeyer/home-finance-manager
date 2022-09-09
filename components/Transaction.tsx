import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@apollo/client";

import { DELETE_TRANSACTION, GET_TRANSACTIONS } from "../graphql";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  TransactionActionsBox,
  TransactionCard,
  TransactionContentBox,
  TransactionDivider,
} from "../styles/components/transaction";
import { Paragraph } from "../styles/global";

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

const Transaction: React.FC<IProps> = ({
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
      <TransactionContentBox>
        <Paragraph variant="subtitle1">{personName}</Paragraph>
        <TransactionDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{price}</Paragraph>
        <TransactionDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{date}</Paragraph>
      </TransactionContentBox>
      <TransactionActionsBox>
        <Chip label={category} color="primary" />
        <Paragraph variant="subtitle1">{name}</Paragraph>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={chooseTransaction}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={deleteTransaction}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </TransactionActionsBox>
    </TransactionCard>
  );
};

export default Transaction;
