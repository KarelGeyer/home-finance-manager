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
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { UserSearchContext } from "../state/context/userContext";
import { GET_USER, GET_TEAM, GET_TRANSACTIONS } from "../graphql";
import { setUser, setTeam, setTransactions } from "../state/reducers";

const Home: React.FC = () => {
  const router = useRouter();
  const { userSearch } = useContext(UserSearchContext);
  const dispatch = useDispatch();

  const {
    loading: isFetchingUser,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(GET_USER, {
    variables: {
      email: userSearch,
    },
  });

  const {
    loading: isFetchingTeamInfo,
    error: teamError,
    data: teamData,
    refetch: teamRefetch,
  } = useQuery(GET_TEAM, {
    variables: {
      email: userSearch,
    },
  });

  const {
    loading: isFetchingTransactions,
    error: transactionsError,
    data: transactionsData,
    refetch: transactionsRefetch,
  } = useQuery(GET_TRANSACTIONS, {
    variables: {
      email: userSearch,
    },
  });

  useEffect(() => {
    userRefetch();
    teamRefetch();
    transactionsRefetch();

    if (!isFetchingUser && !isFetchingTeamInfo && !isFetchingTransactions) {
      dispatch(setUser(userData));
      dispatch(setTeam(teamData));
      dispatch(setTransactions(transactionsData));

      if (window)
        localStorage.setItem("ref_sh_tkn", userData.user.refreshToken);
    }
  }, [isFetchingUser, isFetchingTeamInfo, isFetchingTransactions]);

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
