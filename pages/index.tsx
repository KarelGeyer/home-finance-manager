import { useRouter } from "next/dist/client/router";
import { Heading } from "../components";
import { ROUTE_NAMES } from "../helpers";
import {
  MainBox,
  GridContainer,
  GridItem,
  PieGraphIcon,
  MainPageSection,
} from "../styles/pages/main";

const Home: React.FC = () => {
  const router = useRouter();

  const navigate = (e: any) => {
    const { target } = e;
    const link: string = target.innerText?.toLowerCase();

    router.push(`/${link}`);
  };

  return (
    <MainPageSection>
      <MainBox>
        <GridContainer container spacing={0}>
          {ROUTE_NAMES.map((route) => {
            return (
              <GridItem item xs={5} onClick={(e) => navigate(e)} key={route}>
                <PieGraphIcon color="primary" />
                <Heading variant="h2">{route.toLocaleUpperCase()}</Heading>
              </GridItem>
            );
          })}
        </GridContainer>
      </MainBox>
    </MainPageSection>
  );
};

export default Home;
