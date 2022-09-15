import { IconButton } from "@mui/material";
import { ReactFragment } from "react";
import { ButtonP, FlexBox, FormButton } from "../styles/global";

export interface IProps {
  type: string;
  onClick: any;
  size: "small" | "medium" | "large";
  label?: string;
  iconColor?:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  btnColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  variant?: "text" | "outlined" | "contained";
  children: ReactFragment;
  isSingle?: boolean;
}

export const CustomButton: React.FC<IProps> = ({
  type,
  onClick,
  size,
  label,
  iconColor,
  btnColor,
  variant,
  children,
  isSingle,
}) => {
  return (
    <>
      {type === "icon" ? (
        <IconButton
          onClick={onClick}
          aria-label={label}
          color={iconColor}
          size={size}
        >
          {children}
        </IconButton>
      ) : !isSingle ? (
        <FormButton
          variant={variant}
          onClick={onClick}
          color={btnColor}
          size={size}
        >
          <ButtonP>{children}</ButtonP>
        </FormButton>
      ) : (
        <FlexBox>
          <FormButton
            variant={variant}
            onClick={onClick}
            color={btnColor}
            size={size}
          >
            <ButtonP>{children}</ButtonP>
          </FormButton>
        </FlexBox>
      )}
    </>
  );
};
