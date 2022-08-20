import axios from "axios";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TRANSACTIONS_URL } from "../assets/global";
import {
  TransactionActionsBox,
  TransactionCard,
  TransactionContentBox,
  TransactionDivider,
} from "../styles/components/transaction";
import { Paragraph } from "../styles/global";

export interface IProps {
  name: string;
  user: string;
  price: string;
  tags: string | string[];
  id: string;
}

const Transaction: React.FC<IProps> = ({ name, user, price, tags, id }) => {
  const handleDelete = (): void => {
    axios
      .delete(TRANSACTIONS_URL, {
        data: {
          _id: id,
        },
      })
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log(err));
  };

  return (
    <TransactionCard>
      <TransactionContentBox>
        <Paragraph variant="subtitle1">{name}</Paragraph>
        <TransactionDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{user}</Paragraph>
        <TransactionDivider variant="inset" orientation="vertical" />
        <Paragraph variant="subtitle1">{price}</Paragraph>
      </TransactionContentBox>
      <TransactionActionsBox>
        <Chip label={tags} color="primary" />
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </TransactionActionsBox>
    </TransactionCard>
  );
};

export default Transaction;
