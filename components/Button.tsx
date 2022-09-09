import { Button, IconButton } from "@mui/material";
import { ReactFragment } from "react";

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
      ) : (
        <Button
          variant={variant}
          onClick={onClick}
          color={btnColor}
          size={size}
        >
          {children}
        </Button>
      )}
    </>
  );
};
