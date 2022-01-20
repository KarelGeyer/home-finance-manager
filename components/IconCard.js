import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CommuteIcon from '@mui/icons-material/Commute';
import FlightIcon from '@mui/icons-material/Flight';
import EuroIcon from '@mui/icons-material/Euro';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CircleIcon from '@mui/icons-material/Circle';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const layoutData = [
  {
    name: 'HOME',
    value: '100'
  },
  {
    name: 'FREE TIME',
    value: '100'
  },
  {
    name: 'SHOPPING',
    value: '100'
  },
  {
    name: 'VACATION',
    value: '100'
  },
  {
    name: 'INVEST.',
    value: '100'
  },
  {
    name: 'TELCO',
    value: '100'
  },
  {
    name: 'CLOTHS',
    value: '100'
  },
  {
    name: 'OTHER',
    value: '100'
  },
  {
    name: 'GEAR',
    value: '100'
  },
  {
    name: 'ENERGY',
    value: '100'
  },
  {
    name: 'TRANSPORT',
    value: '100'
  },
  {
    name: 'DAMAGE',
    value: '100'
  },
]

const IconCard = ({ data }) => {
  const thisData = data // preparation for database connection
  return (
    <>
      {!thisData && layoutData.map(item => {
        const {name, value} = item
        return (
          <Grid item xs={3} md={3} sx={{ textAlign: 'center', paddingTop: '20px' }} key={name}>
      
            {name === 'HOME' && <HomeIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'FREE TIME' && <SportsEsportsIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'SHOPPING' && <ShoppingCartIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'VACATION' && <FlightIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'INVEST.' && <EuroIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'TELCO' && <SettingsInputAntennaIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'CLOTHS' && <CheckroomIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'OTHER' && <CircleIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'GEAR' && <CoffeeMakerIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'ENERGY' && <FlashOnIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'TRANSPORT' && <CommuteIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            {name === 'DAMAGE' && <LocalFireDepartmentIcon size="medium" edge="start" color="inherit" aria-label="menu" />}
            
            <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat' }}>
              {name}
            </Typography>
            <Typography variant="subtitle2" component="div" sx={{ fontFamily: 'Montserrat', color: 'blue' }}>
              {value}$
            </Typography>
          </Grid>
        )
      })}
    </>
  )
}

export default IconCard
