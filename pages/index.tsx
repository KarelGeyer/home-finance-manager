import { useRouter } from "next/dist/client/router";
import { useQuery, useMutation, gql } from "@apollo/client";

import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PieChartIcon from "@mui/icons-material/PieChart";
import CalculateIcon from "@mui/icons-material/Calculate";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  MainBox,
  GridContainer,
  GridItem,
  PieGraphIcon,
  AccountIcon,
  AddIcon,
} from "../styles/main";
import { Section, Heading, FormBox } from "../styles/global";

const GET_USERS = gql`
  {
    users {
      name
      surname
      password
      email
      phoneNumber
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($user: UserInput) {
    createUser(user: $user) {
      name
      surname
    }
  }
`;

const Home: React.FC = () => {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);
  const testUser = {
    name: "Karel",
    email: "karelgeyer@testing.cz",
    password: "Karlkani123",
    phoneNumber: 603429067,
    surname: "Geyer",
  };

  const { loading, error, data } = useQuery(GET_USERS);

  console.log(data);

  // useEffect(
  //   () =>
  //     // @ts-ignore
  //     createUser({
  //       variables: { user: testUser },
  //     }),
  //   []
  // );

  const navigate = (e: any) => {
    const { target } = e;
    const link: string = target.innerText?.toLowerCase();

    router.push(`/${link}`);
  };

  return (
    <Section>
      <MainBox>
        <GridContainer container spacing={0}>
          <GridItem item xs={5} onClick={(e) => navigate(e)}>
            <PieGraphIcon color="primary" />
            <Heading variant="h3" color="primary">
              OVERVIEW
            </Heading>
          </GridItem>
          <GridItem item xs={5} onClick={(e) => navigate(e)}>
            <AccountIcon color="primary" />
            <Heading variant="h3" color="primary">
              ACCOUNT
            </Heading>
          </GridItem>
          <GridItem item xs={5} onClick={(e) => navigate(e)}>
            <AddIcon color="primary" />
            <Heading variant="h3" color="primary">
              TRANSACTIONS
            </Heading>
          </GridItem>
        </GridContainer>
      </MainBox>
    </Section>
  );
};

export default Home;
