import { useState, useRef, useEffect } from 'react';
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

interface IProps {
  data: {
    currenyName: string,
    id: string,
    currencySymbol?: string
  }
}

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

const Calculator: React.FC<IProps> = ({data}) => {
  const [firstCurrency, setFirstCurrency] = useState<string>('CZK');
  const [secondCurrency, setSecondCurrency] = useState<string>('EUR');
  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<any>(0);

  const inputRef = useRef<HTMLDivElement>()

  const links: string[] = ['transactions', 'account', 'overview']
  const dataKeys: string[] = Object.keys(data)

  const currencies: string[] = dataKeys.filter((currency: string) =>
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

  useEffect((): void => {
    const input: any  = inputRef.current.children[0];
    input.focus()
    console.log(inputRef);
  }, [])

  const convert = (): void => {
    const currency = `${secondCurrency}_${firstCurrency}`
    axios.get(`https://free.currconv.com/api/v7/convert?q=${currency}&compact=ultra&apiKey=836d0b8433d05fb1ce7a`)
    .then(res => {
      const {data}: any = res;
      const currencyValue: any = Object.values(data)[0];

      const convertedNumber: any = value / currencyValue;
      
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
            <input />
            <Field id="outlined-basic" ref={inputRef} label="value" variant="outlined" onChange={(e: any) => setValue(e.target.value)}/>
          
            <Field
              select
              id="demo-simple-select"
              label="from"
              value={firstCurrency}
              onChange={(e) => setFirstCurrency(e.target.value)}
            >
              {currencies.map((currency: string) => <MenuItem value={currency} key={currency}>{currency}</MenuItem>)}
            </Field>
          </Box>

          <Box sx={{ border: '1px solid black', display: 'flex', padding: '25px'}}> 
            <Field
              select
              id="demo-simple-select"
              label="To"
              value={secondCurrency}
              onChange={(e: any) => setSecondCurrency(e.target.value)}
            >
              {currencies.map((currency: string) => <MenuItem value={currency} key={currency}>{currency}</MenuItem>)}
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

export const getServerSideProps = async () => {
  const res = await fetch('https://free.currconv.com/api/v7/currencies?apiKey=836d0b8433d05fb1ce7a');
  const data = await res.json()

  return {
    props: {
      data: data.results,
    }
  }
}

export default Calculator
