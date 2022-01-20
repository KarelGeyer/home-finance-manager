import { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const EditAccount = ({ closeModal }) => {
  const [currency, setCurrency] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectCurency = (event) => {
    setCurrency(event.target.value);
  };

  const submitForm = (e) => {
    console.log(e)
    setLoading(true)

    setTimeout(() => {
      setLoading(false);
      setSuccess(!success);
    }, 3000)

    setTimeout(() => {
      closeModal();
    }, 4000)
  }

  return (
    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}> 
      <TextField
        id="outlined-name-input"
        label="Name"
        type="text"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      />
      <TextField
        id="outlined-surname-input"
        label="Surname"
        type="text"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      />
      <TextField
        id="outlined-email-input"
        label="Email"
        type="email"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      />
      <TextField
        id="outlined-phoneNumber-input"
        label="Phone number"
        type="tel"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      />
      <TextField
        id="outlined-newPassword-input"
        label="New Password"
        type="password"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      />

      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={currency}
        defaultValue="Select Currency"
        onChange={selectCurency}
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      >
        <MenuItem value={1}>Select Currency</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <TextField
        id="outlined-teamId-input"
        label="Team ID"
        type="text"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
      />

      <Button 
        variant="contained"
        sx={{
          margin: '20px auto', width: '300px', height: '60px', backgroundColor: 'lightgrey', fontWeight: 600, fontFamily: 'Montserrat'
        }}
        onClick={submitForm}
      >
        {!loading &&
          'Submit'
        }
      </Button>
      {loading &&
        <CircularProgress
          size={40}
          sx={{
            color: 'blue',
            position: 'absolute',
            top: '88%',
            left: '49%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      }
    </Box>
  )
}

export default EditAccount
