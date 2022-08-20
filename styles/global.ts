import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export const Section = styled(Box)(() => ({
  height: "70vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  fontFamily: "Montserrat",
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

export const FormBox = styled(Box)(() => ({
  backgroundColor: "white",
  width: "50%",
  height: "50vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  padding: "10px 35px",
}));

export const Form = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

export const FormInput = styled(TextField)(() => ({
  margin: "10px 0",
  width: "45%",
  fontFamily: "Montserrat",
}));

export const FormSelect = styled(Select)(() => ({
  margin: "10px 0",
  width: "45%",
  fontFamily: "Montserrat",
}));

export const FormButton = styled(Button)(() => ({
  margin: "20px auto",
  width: "300px",
  height: "60px",
  backgroundColor: "lightgrey",
  fontWeight: 600,
  fontFamily: "Montserrat",
}));

export const FormProgressIndicator = styled(CircularProgress)(() => ({
  color: "blue",
  position: "absolute",
  top: "88%",
  left: "49%",
  marginTop: "-12px",
  marginLeft: "-12px",
}));

export const MainHeading = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  padding: "0 30px",
  marginBottom: "50px",
  objectFit: "cover",
}));

export const Heading = styled(Typography)(() => ({
  m: 2,
  fontFamily: "Montserrat",
  fontWeight: 600,
}));

export const Paragraph = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  margin: "0 0 0px 0",
  padding: "12px",
}));

export const ButtonParagraph = styled(Typography)(() => ({
  flexGrow: 1,
  fontFamily: "Montserrat",
  margin: "2px",
}));
