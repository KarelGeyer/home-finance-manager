import { Typography } from "@mui/material";
import { ReactFragment } from "react";

export interface IProps {
  variant: "h1" | "h2" | "h5" | "h6";
  children: ReactFragment;
}

export const Heading: React.FC<IProps> = ({ variant, children }) => {
  return <Typography variant={variant}>{children}</Typography>;
};
