import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar } from "@mui/material";

export const LineBar = styled(AppBar)(() => ({
  height: "65px",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
}));

export const Container = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const Division = styled(Box)(() => ({
  minWidth: "250px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}));
