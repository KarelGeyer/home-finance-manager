import { useRouter } from "next/dist/client/router";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  MainBox,
  GridContainer,
  GridItem,
  PieGraphIcon,
  AccountIcon,
  AddIcon,
} from "../styles/main";
import { Section, Heading } from "../styles/global";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useMemo } from "react";
import { UserSearchContext } from "../state/context/userContext";
import { GET_USER, GET_TEAM, GET_TRANSACTIONS } from "../graphql";
import { setUser, setTeam, setTransactions } from "../state/reducers";

const Home: React.FC = (props) => {
  const router = useRouter();

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
