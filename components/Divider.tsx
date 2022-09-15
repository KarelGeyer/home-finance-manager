import { StyledDivider } from "../styles/components/divider";

export interface IProps {
  variant: "inset" | "fullWidth" | "middle";
  orientation: "vertical" | "horizontal";
}

export const CustomDivider: React.FC<IProps> = ({ variant, orientation }) => {
  return <StyledDivider variant={variant} orientation={orientation} />;
};
