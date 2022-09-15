import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const LoginSection = styled(Box)(() => ({
  padding: "0 2rem",
  backgroundImage: "url('../public/background.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black",
}));

export const Card = styled(Box)(() => ({
  borderRadius: "55px",
  height: "500px",
  width: "400px",
}));

export const CardHeader = styled(Box)(() => ({
  borderRadius: "55px",
  height: "30%",
  width: "100%",
  backgroundColor: "rgb(0 ,0, 108, 0.9)",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  textAlign: "center",
  padding: "5px 30px",
  color: "#FFF",
}));

export const CardBody = styled(Box)(() => ({
  height: "70%",
  width: "100%",
  backgroundColor: "rgb(255,255,255,0.9)",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  padding: "30px 50px 0 50px",
}));

export const CardInput = styled(TextField)(() => ({
  marginTop: "20px",
  width: "300px",
}));

export const CardButton = styled(Button)(() => ({
  marginTop: "60px",
  width: "300px",
  height: "60px",
}));

export const AccountIcon = styled(AccountCircleIcon)(() => ({
  marginTop: "-70px",
  width: "120px",
  height: "120px",
}));
