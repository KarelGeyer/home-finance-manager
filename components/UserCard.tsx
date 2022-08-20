import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EuroIcon from "@mui/icons-material/Euro";

import { Paragraph } from "../styles/global";
import { Usercard } from "../styles/components/userCard";

export interface IProps {
  user: {
    name: string;
    amount: string;
  };
}

const UserCard: React.FC<IProps> = ({ user }) => {
  const { name, amount } = user;

  return (
    <>
      <Usercard>
        <AccountCircleIcon
          sx={{
            width: "30px",
            height: "30px",
          }}
          color="primary"
        />
        <Paragraph variant="subtitle1" sx={{ color: "blue" }}>
          {name}
        </Paragraph>
      </Usercard>

      <Usercard>
        <EuroIcon
          sx={{
            width: "30px",
            height: "30px",
          }}
          color="primary"
        />
        <Paragraph variant="subtitle1" sx={{ color: "blue" }}>
          {amount}
        </Paragraph>
      </Usercard>

      <Divider variant="middle" sx={{ minWidth: "180px" }} />
    </>
  );
};

export default UserCard;
