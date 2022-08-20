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
import { Paragraph } from "../styles/global";

export interface IProps {
  data?: any; //preparation for conecting to dp, type is yet unknown
}

const layoutData: { name: string; value: string }[] = [
  {
    name: "HOME",
    value: "100",
  },
  {
    name: "FREE TIME",
    value: "100",
  },
  {
    name: "SHOPPING",
    value: "100",
  },
  {
    name: "VACATION",
    value: "100",
  },
  {
    name: "INVEST.",
    value: "100",
  },
  {
    name: "TELCO",
    value: "100",
  },
  {
    name: "CLOTHS",
    value: "100",
  },
  {
    name: "OTHER",
    value: "100",
  },
  {
    name: "GEAR",
    value: "100",
  },
  {
    name: "ENERGY",
    value: "100",
  },
  {
    name: "TRANSPORT",
    value: "100",
  },
  {
    name: "DAMAGE",
    value: "100",
  },
];

const IconCard: React.FC<IProps> = ({ data }) => {
  const thisData = data; // preparation for database connection
  return (
    <>
      {!thisData &&
        layoutData.map((item: { name: string; value: string }) => {
          const { name, value } = item;
          return (
            <IconsWrapper item xs={3} md={3} key={name}>
              {name === "HOME" && <HomeIcon fontSize="medium" />}
              {name === "FREE TIME" && <SportsEsportsIcon fontSize="medium" />}
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
              )}

              <Paragraph variant="subtitle1">{name}</Paragraph>
              <Paragraph variant="subtitle2" sx={{ color: "blue" }}>
                {value}$
              </Paragraph>
            </IconsWrapper>
          );
        })}
    </>
  );
};

export default IconCard;
