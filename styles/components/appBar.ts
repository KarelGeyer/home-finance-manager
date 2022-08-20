import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import AppBar from "@mui/material/AppBar";

export const LineBar = styled(AppBar)(() => ({
  height: "65px",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
}));

export const MenuSelect = styled(Select)(() => ({
  marginRight: "25px",
  fontFamily: "Montserrat",
  maxHeight: "32px",
  backgroundColor: "#FFF",
}));
