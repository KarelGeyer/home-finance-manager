import { Typography } from "@mui/material";
import { ReactFragment } from "react";

export interface IProps {
  variant: "subtitle1" | "subtitle2";
  children: ReactFragment;
}

export const Paragraph: React.FC<IProps> = ({ variant, children }) => {
  return <Typography variant={variant}>{children}</Typography>;
};
