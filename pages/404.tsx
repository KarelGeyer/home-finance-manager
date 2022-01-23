import {useEffect} from 'react';
import { NextRouter, useRouter } from "next/dist/client/router";
import Box from '@mui/material/Box';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NotFound: React.FC = () => {
  const router: NextRouter = useRouter()

  useEffect((): void => {
    setTimeout((): void => {
      redirect()
    }, 5000)
  });

  const redirect = (): void => {
    router.push('/');
  }

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        height: '80vh', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
      <WarningIcon 
        sx={{
          width: '300px', height: '300px'
        }}
        color='error' />
      <Typography variant="h3" color="error" sx={{ m: 2, fontFamily: 'Montserrat', fontWeight: 600, textShadow: '8px 8px 10px #000, 5px 5px 15px #000' }}>
        PAGE NOT FOUND!
      </Typography>
      <Typography variant="h5" sx={{ m: 2, fontFamily: 'Montserrat', fontWeight: 600, textShadow: '1px 0px 3px #FFF, 1px 0px 1px #FFF' , color: "#000" }}>
        You will be redirected back in 5 seconds, in case it does not happen, click the button bellow
      </Typography>
      <Button 
        variant="contained"
        color="error"
        sx={{
          marginTop: '60px', width: '300px', height: '60px'
        }}
        onClick={redirect}
      >
        Go back
      </Button>
    </Box>
  )
}

export default NotFound