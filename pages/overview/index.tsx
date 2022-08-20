import Grid from "@mui/material/Grid";

import AppBarMenu from "../../components/AppBar";
import IconCard from "../../components/IconCard";
import UserCard from "../../components/UserCard";
import PieGraph from "../../components/PieGraph";
import BarGraph from "../../components/BarGraph";

import {
  GridContainer,
  GridItemPieGraph,
  GridItemIconCard,
  GridItemBarGraph,
  BoxPieGraph,
} from "../../styles/pages/overview";
import { Section } from "../../styles/global";

const OverView: React.FC = () => {
  const links: string[] = ["transactions", "account", "calculator"];
  const users: { name: string; amount: string }[] = [
    {
      name: "Karel Geyer",
      amount: "400",
    },
    {
      name: "Lara Neves",
      amount: "200",
    },
  ];

  const pieGraphData: {
    labels: string[];
    data: { label: string; datasets: number[] };
  } = {
    labels: ["Test1", "Test1", "Test1", "Test1"],
    data: {
      label: "Monthly Expenses",
      datasets: [30, 50, 100, 60],
    },
  };

  const monthsOverviewData: {
    labels: string[];
    data: { label: string; datasets: number[] };
  } = {
    labels: ["Month1", "Month2", "Month3", "Month4", "Month5", "Month6"],
    data: {
      label: "This month",
      datasets: [600, 500, 1000, 590, 620, 600],
    },
  };

  const usersBalanceData: {
    labels: string[];
    data: { label: string; datasets: number[] };
  } = {
    labels: ["Test1", "Test1"],
    data: {
      label: "This month",
      datasets: [30, 50],
    },
  };

  const total = { name: "Total", amount: "600" };

  return (
    <Section>
      <AppBarMenu
        heading="Overview"
        group={true}
        monthPicker={true}
        links={links}
      />
      <GridContainer container>
        <GridItemPieGraph item xs={12} md={7}>
          <BoxPieGraph>
            <PieGraph labels={pieGraphData.labels} data={pieGraphData.data} />
          </BoxPieGraph>
        </GridItemPieGraph>

        <GridItemIconCard item xs={12} md={5}>
          <Grid container>
            <IconCard />
          </Grid>
        </GridItemIconCard>

        <GridItemBarGraph item xs={12} md={5} direction="row">
          <BarGraph
            labels={monthsOverviewData.labels}
            data={monthsOverviewData.data}
          />
        </GridItemBarGraph>

        <GridItemIconCard item xs={12} md={2}>
          <Grid container sx={{ minWidth: "200px" }}>
            <Grid item xs={7}>
              {users.map(
                (user: { name: string; amount: string }, index: number) => (
                  <UserCard user={user} key={index} />
                )
              )}

              <UserCard user={total} key={1} />
            </Grid>
          </Grid>
        </GridItemIconCard>
      </GridContainer>
    </Section>
  );
};

export default OverView;
