import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export const TransactionCard = styled(Card)(() => ({
  width: 400,
  margin: "10px",
}));

export const TransactionContentBox = styled(CardContent)(() => ({
  width: "100%",
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 5px 5px 5px !important",
}));

export const TransactionActionsBox = styled(CardActions)(() => ({
  width: "100%",
  height: "40px",
  justifyContent: "space-between",
  padding: "10px 5px 0 5px",
}));
