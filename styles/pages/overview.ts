import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const GridItemBase = styled(Grid)(() => ({
  minHeight: "200px",
  display: "flex",
}));

export const GridItemPieGraph = styled(GridItemBase)(() => ({
  borderBottom: "1px solid lightgrey",
  borderRight: "1px solid lightgrey",
}));

export const GridItemIconCard = styled(GridItemBase)(() => ({
  padding: "20px",
}));

export const GridItemBarGraph = styled(GridItemBase)(() => ({
  justifyContent: "center",
  alignItems: "center",
  padding: "0 40px",
  borderRight: "1px solid lightgrey",
}));

export const BoxPieGraph = styled(Box)(() => ({
  fontFamily: "Montserrat",
  width: "350px",
  height: "400px",
  padding: "20px",
  marginLeft: "200px",
}));
