import { Chip } from "@mui/material";

export interface IProps {
  label: string;
  color: string;
}

export const Badge: React.FC<IProps> = ({ label, color }) => {
  return (
    <>
      <Chip label={label} sx={`background-color: ${color}`} />
    </>
  );
};
