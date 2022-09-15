import { ReactFragment } from "react";
import { H } from "../styles/global";

export interface IProps {
  variant: "h2" | "h3" | "h5" | "h6";
  children: ReactFragment;
}

export const Heading: React.FC<IProps> = ({ variant, children }) => {
  return <H variant={variant}>{children}</H>;
};
