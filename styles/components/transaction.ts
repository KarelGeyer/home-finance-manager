import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";

export const TransactionCard = styled(Card)(() => ({
  width: 400,
  margin: "10px",
}));

export const TransactionContentBox = styled(CardContent)(() => ({
  width: "100%",
  display: "flex",
  padding: " 8px 8px 0 8px",
}));

export const TransactionActionsBox = styled(CardActions)(() => ({
  justifyContent: "space-between",
  padding: "5px",
}));

export const TransactionDivider = styled(Divider)(() => ({
  height: "30px",
  margin: "0 5px",
}));
