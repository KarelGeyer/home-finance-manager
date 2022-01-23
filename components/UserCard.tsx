import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EuroIcon from '@mui/icons-material/Euro';

export interface IProps {
  user: {
    name: string,
    amount: string
  }
}

const UserCard: React.FC<IProps> = ({ user }) => {
  const {name, amount} = user

  return (
    <>
      <Box sx={{ display: 'flex', padding: '5px 15px', minWidth: '200px' }}>
        <AccountCircleIcon
          sx={{
            width: '30px', height: '30px'
          }}
          color='primary' />
        <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat', color: 'blue', margin: '0 15px' }}>
          {name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', padding: '5px 15px', minWidth: '200px' }}>
        <EuroIcon
          sx={{
            width: '30px', height: '30px'
          }}
          color='primary' />
        <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat', color: 'blue', margin: '0 15px' }}>
          {amount}
        </Typography>
      </Box>

      <Divider variant="middle" sx={{ minWidth: '180px' }} />
    </>
  )
}

export default UserCard
