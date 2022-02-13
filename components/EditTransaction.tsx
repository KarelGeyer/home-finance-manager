import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router'

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios, {AxiosResponse} from 'axios';
import { TRANSACTIONS_URL } from '../assets/global';

interface IProps {
  closeModal: () => void
}

export interface Transaction {
    name: string,
    person: string,
    category: string,
    sum: number,
    currency: string,
    date: string,
    month?: string,
    isLoand?: boolean,
    tags?: string | string[]
}

const EditTransaction: React.FC<IProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router: NextRouter = useRouter()
  const [formData, setFormData] = useState<Transaction>({
    name: '',
    person: 'Karel Geyer',
    date: '',
    category: '',
    sum: 0,
    currency: '',
    month: 'February',
    isLoand: false,
    tags: '',
  });

  const submitForm = (e: any): void => {
    setLoading(true)

    axios.post(TRANSACTIONS_URL, formData)
    .then((res): any => {
        const {status} = res;
        if (status == 201) {
            const location: string = window.location.pathname;

            setLoading(false);
            setSuccess(!success);
            router.reload(location);
        }
    })
    .catch((err: any) => console.log(err))
}

  return (
    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}> 
      <TextField
        id="outlined-Name-input"
        label="Name"
        type="text"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
        onChange={(e:any) => setFormData({...formData, name: e.target.value})}
      />
      <TextField
        id="outlined-category-input"
        label="category"
        type="text"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
        onChange={(e:any) => setFormData({...formData, category: e.target.value})}
      />
      <TextField
        id="outlined-tags-input"
        label="tags"
        type="text"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
        onChange={(e:any) => setFormData({...formData, tags: e.target.value})}
      />
      <TextField
        id="outlined-sum-input"
        label="sum"
        type="number"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
        onChange={(e:any) => setFormData({...formData, sum: e.target.value})}
      />
      <TextField
        id="date"
        type="date"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
        onChange={(e:any) => setFormData({...formData, date: e.target.value})}
      />

      <TextField
        id="currency"
        label="currency"
        type="text"
        sx={{ margin: '10px 0', width: '45%', fontFamily: 'Montserrat'}}
        onChange={(e:any) => setFormData({...formData, currency: e.target.value})}
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

export default EditTransaction
