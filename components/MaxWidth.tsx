import { MaxWidthBox } from "../styles/global";
import { ReactFragment } from "react";

interface IProps {
  children?: ReactFragment;
}

const MaxWidth: React.FC<IProps> = ({ children }) => {
  return <MaxWidthBox>{children}</MaxWidthBox>;
};

export default MaxWidth;
