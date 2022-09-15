import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommuteIcon from "@mui/icons-material/Commute";
import FlightIcon from "@mui/icons-material/Flight";
import EuroIcon from "@mui/icons-material/Euro";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import CircleIcon from "@mui/icons-material/Circle";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { IconsWrapper } from "../styles/components/iconCard";
import { Paragraph } from ".";

export interface IProps {
  category: string; //preparation for conecting to dp, type is yet unknown
  value: number;
}

export const IconCard: React.FC<IProps> = ({ category, value }) => {
  return (
    <IconsWrapper item xs={3} md={3}>
      <HomeIcon fontSize="medium" />
      {/* {name === "FREE TIME" && <SportsEsportsIcon fontSize="medium" />}
              {name === "SHOPPING" && <ShoppingCartIcon fontSize="medium" />}
              {name === "VACATION" && <FlightIcon fontSize="medium" />}
              {name === "INVEST." && <EuroIcon fontSize="medium" />}
              {name === "TELCO" && (
                <SettingsInputAntennaIcon fontSize="medium" />
              )}
              {name === "CLOTHS" && <CheckroomIcon fontSize="medium" />}
              {name === "OTHER" && <CircleIcon fontSize="medium" />}
              {name === "GEAR" && <CoffeeMakerIcon fontSize="medium" />}
              {name === "ENERGY" && <FlashOnIcon fontSize="medium" />}
              {name === "TRANSPORT" && <CommuteIcon fontSize="medium" />}
              {name === "DAMAGE" && (
                <LocalFireDepartmentIcon fontSize="medium" />
              )} */}

      <Paragraph variant="subtitle1">{category}</Paragraph>
      <Paragraph variant="subtitle2">{value}$</Paragraph>
    </IconsWrapper>
  );
};
