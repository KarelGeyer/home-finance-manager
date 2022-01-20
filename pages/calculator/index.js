import { useState } from 'react';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AppBarMenu from "../../components/AppBar";

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

const Field = styled(TextField)(() => ({
  width: '200px',
  margin: '10px',
  height: '50px'
}))

const Calculator = ({data}) => {
  const [firstCurrency, setFirstCurrency] = useState('CZK');
  const [secondCurrency, setSecondCurrency] = useState('EUR');
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(0);

  const links = ['transactions', 'account', 'overview']
  const dataKeys = Object.keys(data)

  const currencies = dataKeys.filter((currency) =>
    currency === 'CZK' ||
    currency === 'EUR' ||
    currency === 'DKK' ||
    currency === 'HUF' ||
    currency === 'ISK' ||
    currency === 'NOK' ||
    currency === 'PLN' ||
    currency === 'SEK' ||
    currency === 'CHF' ||
    currency === 'GBP'
  )

  const convert = () => {
    const currency = `${secondCurrency}_${firstCurrency}`
    axios.get(`https://free.currconv.com/api/v7/convert?q=${currency}&compact=ultra&apiKey=836d0b8433d05fb1ce7a`)
    .then(res => {
      const {data} = res;
      const currencyValue = Object.values(data)[0];

      const convertedNumber = value / currencyValue;
      
      setResult(convertedNumber.toFixed(2));
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Section>
      <AppBarMenu heading='Overview' group={false} monthPicker={false} links={links}/>
      <GridContainer>
        <Grid item xs={6} md={6}>
          <Box sx={{ border: '1px solid black', display: 'flex', padding: '25px'}}> 
            <Field id="outlined-basic" label="value" variant="outlined" onChange={(e) => setValue(e.target.value)}/>
          
            <Field
              select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="from"
              value={firstCurrency}
              onChange={(e) => setFirstCurrency(e.target.value)}
            >
              {currencies.map(currency => <MenuItem value={currency} key={currency}>{currency}</MenuItem>)}
            </Field>
          </Box>

          <Box sx={{ border: '1px solid black', display: 'flex', padding: '25px'}}> 
            <Field
              select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="To"
              value={secondCurrency}
              onChange={(e) => setSecondCurrency(e.target.value)}
            >
              {currencies.map(currency => <MenuItem value={currency} key={currency}>{currency}</MenuItem>)}
            </Field>
            <Button variant='outlined' onClick={convert} sx={{ width: '200px', height: '55px', margin: '10px'}}>
              submit
            </Button>
          </Box>

          <Box sx={{ border: '1px solid black', display: 'flex', padding: '25px'}}> 
            <Field id="outlined-basic" variant="outlined" value={parseFloat(result)} disabled />
          </Box>
        </Grid>
      </GridContainer>
    </Section>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://free.currconv.com/api/v7/currencies?apiKey=836d0b8433d05fb1ce7a');
  const data = await res.json()

  return {
    props: {
      data: data.results,
    }
  }
}

export default Calculator
