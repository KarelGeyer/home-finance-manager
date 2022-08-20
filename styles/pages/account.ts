import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

export const GridContainer = styled(Grid)(() => ({
  backgroundColor: "rgb(255, 255, 255, 0.9)",
  width: "100%",
}));

export const ImageBox = styled(Box)(() => ({
  border: "1px solid black",
  margin: "50px 0 0 250px",
  width: "350px",
  height: "350px",
  borderRadius: "100%",
  overflow: "hidden",
  position: "relative",
}));

export const ButtonWithIcon = styled(IconButton)(() => ({
  margin: 0,
  height: "50px",
  width: "50",
}));
