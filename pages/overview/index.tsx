import { useState } from "react";
import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AppBarMenu from "../../components/AppBar";
import IconCard from "../../components/IconCard";
import UserCard from "../../components/UserCard";
import PieGraph from "../../components/PieGraph";
import BarGraph from "../../components/BarGraph";

import EuroIcon from '@mui/icons-material/Euro';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Section = styled(Box)(() => ({
  height: '70vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

const GridContainer = styled(Grid)(() => ({
  backgroundColor: 'rgb(255, 255, 255, 0.9)'
}))

const GridItem = styled(Grid)(() => ({
  minHeight: '200px',
  display: 'flex',
}))

const OverView: React.FC = () => {
  const links: string[] = ['transactions', 'account', 'calculator']
  const users: {name: string, amount: string}[] = [
    {
      name: 'Karel Geyer',
      amount: '400'
    },
    {
      name: 'Lara Neves',
      amount: '200'
    }
  ];

  const pieGraphData: {labels: string[], data: {label: string, datasets: number[]}} = {
    labels: ['Test1', 'Test1', 'Test1', 'Test1'],
    data: {
      label: 'Monthly Expenses',
      datasets: [30, 50, 100, 60]
    }
  }

  const monthsOverviewData: {labels: string[], data: {label: string, datasets: number[]}} = {
    labels: ['Month1', 'Month2', 'Month3', 'Month4', 'Month5', 'Month6'],
    data: {
      label: 'This month',
      datasets: [600, 500, 1000, 590, 620, 600]
    }
  }

  const usersBalanceData: {labels: string[], data: {label: string, datasets: number[]}} = {
    labels: ['Test1', 'Test1'],
    data: {
      label: 'This month',
      datasets: [30, 50]
    }
  }

  return (
    <Section sx={{ fontFamily: 'Montserrat' }}>
      <AppBarMenu heading='Overview' group={true} monthPicker={true} links={links} />

      <GridContainer container>

        <GridItem item xs={12} md={7} sx={{ borderBottom: '1px solid lightgrey', borderRight: '1px solid lightgrey' }}>
          <Box sx={{ fontFamily: 'Montserrat', width: '350px', height: '400px', padding: '20px', marginLeft: '200px' }}>
            <PieGraph labels={pieGraphData.labels} data={pieGraphData.data} />
          </Box>
        </GridItem>

        <GridItem item xs={12} md={5} sx={{ padding: '20px', borderBottom: '1px solid lightgrey' }}>
          <Grid container>
            <IconCard />
          </Grid>
        </GridItem>

        <GridItem item xs={12} md={5} direction='row' sx={{ justifyContent: 'center', alignItems: 'center', padding: '0 40px', borderRight: '1px solid lightgrey' }}>
          <BarGraph labels={monthsOverviewData.labels} data={monthsOverviewData.data} />
        </GridItem>

        <GridItem item xs={12} md={2} sx={{ padding: '20px 0', borderRight: '1px solid lightgrey' }}>
          <Grid container sx={{ minWidth: '200px' }}>
            <Grid item xs={7}>
              
              {users.map((user: {name:string, amount: string}, index: number) => <UserCard user={user} key={index}/>)}

              <Box sx={{ display: 'flex', padding: '5px 15px', minWidth: '200px' }}>
                <AccountCircleIcon
                  sx={{
                    width: '30px', height: '30px'
                  }}
                  color='action' />
                <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat', color: 'blue', padding: '0 15px' }}>
                  Total
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', padding: '5px 15px', minWidth: '200px' }}>
                <EuroIcon
                  sx={{
                    width: '30px', height: '30px'
                  }}
                  color='primary' />
                <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat', color: 'blue', margin: '0 15px' }}>
                  600
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </GridItem>


        <GridItem item xs={12} md={5} direction='row' sx={{ justifyContent: 'center', alignItems: 'center', padding: '0 40px' }}>
          <BarGraph labels={usersBalanceData.labels} data={usersBalanceData.data} />
        </GridItem>

      </GridContainer>
    </Section>
  )
}

export default OverView
