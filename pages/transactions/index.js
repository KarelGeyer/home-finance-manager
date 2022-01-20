import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import AppBarMenu from "../../components/AppBar";
import LineGraph from "../../components/LineGraph";
import Transaction from "../../components/Transaction";

import AddCircleIcon from '@mui/icons-material/AddCircle';

const Section = styled(Box)(() => ({
  height: '70vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

const GridContainer = styled(Grid)(() => ({
  backgroundColor: 'rgb(255, 255, 255, 0.9)',
  width: '100%'
}))

const Transactions = () => {
  const [filterValue, setFilterValue] = useState('Group');

  const links = ['overview', 'account', 'calculator']

  const selectFilter = (e) => {
    setFilterValue(e.target.value)
  }

  const fakeDates = ['1.1.', '5.1', '12.1', '15.1', '18.1', '26.1', '31.1']
  const fakeSpendings = [1000, 6850, 1240, 18000, 512, 6914, 1105]

  const TransactionFakeData = [
    {
      name: 'Shopping food',
      user: 'Karel Geyer',
      price: '100 EUR',
      tags: 'shopping',
      key: 1
    },
    {
      name: 'Shopping food',
      user: 'Karel Geyer',
      price: '100 EUR',
      tags: 'shopping',
      key: 2
    }
  ]

  return (
    <Section sx={{ fontFamily: 'Montserrat' }}>
      <AppBarMenu heading='Transactions' group={true} monthPicker={true} links={links}> 
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, borderRadius: '50px', padding: '4px 10px 4px 4px', border: '1px solid white' }}
          >
            <AddCircleIcon fontSize='large'/>
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontFamily: 'Montserrat', margin: '2px' }}>
              Add New
            </Typography>
          </IconButton>
        </Box>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue='Sort by'
          value={filterValue}
          onChange={selectFilter}
          sx={{ marginRight: '25px', fontFamily: 'Montserrat', maxHeight: '32px', backgroundColor: '#FFF' }}>
          <MenuItem value='Group'> Date </MenuItem>
          <MenuItem value='Person 1'> Amount </MenuItem>
          <MenuItem value='Person 2'> User </MenuItem>
        </Select>
      </AppBarMenu>

      <GridContainer container xs={12} md={12} sx={{ padding: '20px' }}>

        <Grid item xs={12} md={5} sx={{ textAlign: 'center', paddingTop: '20px', maxHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems:'center', overflow: 'scrollX' }}>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Montserrat', fontWeight: 600, marginBottom: '25px' }}>
            Transactions
          </Typography>
          <Box>
            
            {TransactionFakeData.map(transaction => (
              <Transaction 
                name={transaction.name} 
                user={transaction.user} 
                price={transaction.price} 
                tags={transaction.tags} 
                key={transaction.key}/>
            ))}

          </Box>
        </Grid> 

        <Grid item xs={12} md={7} sx={{ textAlign: 'center', paddingTop: '20px' }}>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Montserrat', fontWeight: 600, marginBottom: '25px' }}>
            Spendings By Day
          </Typography>
          <Box sx={{ height: '400px' }}>
            <LineGraph labels={fakeDates} data={fakeSpendings} />
          </Box> 
        </Grid>
       </GridContainer>

    </Section>
  )
}

export default Transactions
