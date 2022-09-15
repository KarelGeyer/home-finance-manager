import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export const Section = styled(Box)(() => ({
  height: "70vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  fontFamily: "Montserrat",
}));

export const GridContainer = styled(Grid)(() => ({
  backgroundColor: "rgb(255, 255, 255, 0.9)",
  width: "100%",
  padding: "35px 20px",
}));

export const MaxWidthBox = styled(Box)(() => ({
  height: "100vh",
  maxWidth: "1280px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black",
  margin: "0 auto",
}));

export const FlexBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

export const Form = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

export const FormInput = styled(TextField, {
  shouldForwardProp: (props) => props !== "isInForm",
})(({ isInForm }: any) => ({
  margin: isInForm ? "10px 0" : "10px",
  minWidth: "150px",
  width: "45%",
  fontFamily: "Montserrat",
}));

export const FormSelect = styled(Select, {
  shouldForwardProp: (props) => props !== "isInForm",
})(({ isInForm }: any) => ({
  margin: isInForm ? "10px 0" : "10px",
  width: "45%",
  fontFamily: "Montserrat",
}));

export const FormButton = styled(Button)(() => ({
  minWidth: "200px",
  fontFamily: "Montserrat",
  borderRadius: "4px !important",
  margin: "10px !important",
}));

export const H = styled(Typography)(() => ({
  m: 2,
  fontFamily: "Montserrat",
  fontWeight: 600,
  padding: "20px",
}));

export const P = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  margin: "0 0 0px 0",
  padding: "12px",
}));

export const ButtonP = styled(Typography)(() => ({
  flexGrow: 1,
  fontFamily: "Montserrat",
  margin: "2px",
  padding: "12px",
}));
