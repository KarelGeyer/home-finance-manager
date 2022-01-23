import React from 'react';
import { NextRouter, useRouter } from "next/dist/client/router";
import Box from '@mui/material/Box';
import styles from '../../styles/Login.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Index: React.FC = () => {
  const router: NextRouter = useRouter()

  const handleSubmit = (): void => {
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <Box className={styles.card}> 
        <div className={styles.cardHeader}>
          <AccountCircleIcon 
            sx={{
              marginTop: '-70px', width: '120px', height: '120px',
            }}
          />
          <Typography variant="h2">
            Login Form
          </Typography>
        </div>
        <div className={styles.cardBody}>
          <TextField
            className={styles.cardInput} 
            sx={{
              '& > :not(style)': {marginTop: '15px', width: '300px'}
            }}
            id="outlined-name-input"
            label="Name"
            type="test"
          />

          <TextField
            className={styles.cardInput}  
            sx={{
              '& > :not(style)': { marginTop: '20px', width: '300px'},
            }}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button 
            variant="contained"
            sx={{
              marginTop: '60px', width: '300px', height: '60px'
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default Index;
