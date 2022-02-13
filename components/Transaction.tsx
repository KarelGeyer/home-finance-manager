import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TRANSACTIONS_URL } from '../assets/global';

export interface IProps {
  name: string,
  user: string,
  price: string,
  tags: string | string[],
  id: string
}

const Transaction: React.FC<IProps> = ({ name, user, price, tags, id }) => {

  const handleDelete = ():void => {
    axios.delete(TRANSACTIONS_URL, {
      data: {
        _id: id
      }
    })
    .then((res: any) => console.log(res))
    .catch((err: any) => console.log(err))
  };

  return (
    <Card sx={{ width: 360, margin: '10px' }}>
      <CardContent sx={{ width: '100%', display: 'flex', padding: ' 8px 8px 0 8px' }}>
        <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat' }}>
          {name}
        </Typography>

        <Divider variant='inset' orientation="vertical"  sx={{ height: '30px', margin: '0 5px'}}/>

        <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat'}}>
          {user}
        </Typography>
        
        <Divider variant='inset' orientation="vertical"  sx={{ height: '30px', margin: '0 5px'}}/>

        <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat' }}>
          {price}
        </Typography>
      </CardContent>
      <CardActions  sx={{ justifyContent: 'space-between', paddingRight: '15px' }}>
        <Chip label={tags} color="primary" />
        <Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <EditIcon />
          </IconButton>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>

        </Box>
      </CardActions>
    </Card>
  )
}

export default Transaction
