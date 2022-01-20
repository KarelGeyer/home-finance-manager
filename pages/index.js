import { useRouter } from "next/dist/client/router";
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PieChartIcon from '@mui/icons-material/PieChart';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Home() {
  const router = useRouter()

  const navigate = (e) => {
    const {target} = e
    const link = target.innerText?.toLowerCase()
    
    router.push(`/${link}`)
  }

  return (
    <div className={styles.container}>
      <Box 
        sx={{ 
          flexGrow: 1, 
          height: '70vh', 
          display:'flex', 
          justifyContent:"center" 
        }}>
        <Grid 
          justifyContent="center" 
          container 
          spacing={0} 
          sx={{ 
            height: '70vh',
            width: '100%',
          }}>
          <Grid 
            item 
            xs={5} 
            sx={{ 
              backgroundColor: 'rgb(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              m: 2 
            }}
            className={styles.card}
            onClick={(e) => navigate(e)}>
            <PieChartIcon 
              sx={{
                width: '120px', height: '120px'
              }}
              color='primary' />
            <Typography variant="h3" color="primary" sx={{ m: 2, fontFamily: 'Montserrat', fontWeight: 600 }}>
              OVERVIEW
            </Typography>
          </Grid>
          <Grid 
            item 
            xs={5} 
            sx={{ 
              backgroundColor: 'rgb(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              m: 2 
            }}
            className={styles.card}
            onClick={(e) => navigate(e)}>
            <AccountCircleIcon 
              sx={{
                width: '120px', height: '120px'
              }}
              color='primary' />
            <Typography variant="h3" color="primary" sx={{ m: 2, fontFamily: 'Montserrat', fontWeight: 600 }}>
              ACCOUNT
            </Typography>
          </Grid>
          <Grid 
            item 
            xs={5} 
            sx={{ 
              backgroundColor: 'rgb(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              m: 2 
            }}
            className={styles.card}
            onClick={(e) => navigate(e)}>
            <AddCircleIcon 
              sx={{
                width: '120px', height: '120px'
              }}
              color='primary' />
            <Typography variant="h3" color="primary" sx={{ m: 2, fontFamily: 'Montserrat', fontWeight: 600 }}>
              TRANSACTIONS
            </Typography>
          </Grid>
          <Grid 
            item 
            xs={5} 
            sx={{ 
              backgroundColor: 'rgb(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              m: 2 
            }}
            className={styles.card}
            onClick={(e) => navigate(e)}>
            <CalculateIcon 
              sx={{
                width: '120px', height: '120px'
              }}
              color='primary' />
            <Typography variant="h3" color="primary" sx={{ m: 2, fontFamily: 'Montserrat', fontWeight: 600 }}>
              CALCULATOR
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
