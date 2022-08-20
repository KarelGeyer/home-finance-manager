import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PieChartIcon from "@mui/icons-material/PieChart";

export const Section = styled(Box)(() => ({
  padding: "0 2rem",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black",
}));

export const MainBox = styled(Box)(() => ({
  flexGrow: 1,
  height: "70vh",
  display: "flex",
  justifyContent: "center",
}));

export const GridContainer = styled(Grid)(() => ({
  height: "70vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

export const GridItem = styled(Grid)(() => ({
  backgroundColor: "rgb(0,0,0,0.7)",
  margin: "20px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  border: "1px solid rgba(80,68,250,1)",
  height: "300px",
  minWidth: "300px",
  padding: "50px 20px",
  borderRadius: "5px",
  transition: "400ms ease-in-out",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: "500",

  "&:hover": {
    transform: "scale(1.04)",
    boxShadow: "0 15px 23px -4px rgba(80,68,250,1)",
    backgroundColor: "rgb(0,0,0,0.9)",
  },
}));

export const PieGraphIcon = styled(PieChartIcon)(() => ({
  width: "120px",
  height: "120px",
}));

export const AccountIcon = styled(PieChartIcon)(() => ({
  width: "120px",
  height: "120px",
}));

export const AddIcon = styled(PieChartIcon)(() => ({
  width: "120px",
  height: "120px",
}));
