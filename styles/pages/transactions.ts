import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

export const TransactionGrid = styled(Grid)(() => ({
  textAlign: "center",
  paddingTop: "30px",
  maxHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "scrollX",
}));
