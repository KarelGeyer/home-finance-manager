import { ReactFragment } from "react";
import { P } from "../styles/global";

export interface IProps {
  variant: "subtitle1" | "subtitle2";
  children: ReactFragment;
}

export const Paragraph: React.FC<IProps> = ({ variant, children }) => {
  return <P variant={variant}>{children}</P>;
};
