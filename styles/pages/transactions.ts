import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";

export const GridContainer = styled(Grid)(() => ({
  backgroundColor: "rgb(255, 255, 255, 0.9)",
  width: "100%",
}));

export const ButtonWithIcon = styled(IconButton)(() => ({
  mr: 2,
  borderRadius: "50px",
  padding: "4px 10px 4px 4px",
  border: "1px solid white",
}));

export const ButtonWithIconTypography = styled(Typography)(() => ({
  flexGrow: 1,
  fontFamily: "Montserrat",
  margin: "2px",
}));

export const TransactionGrid = styled(Grid)(() => ({
  textAlign: "center",
  paddingTop: "30px",
  maxHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "scrollX",
}));

export const FilterSelect = styled(Select)(() => ({
  marginRight: "25px",
  fontFamily: "Montserrat",
  maxHeight: "32px",
  backgroundColor: "#FFF",
}));
