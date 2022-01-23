import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export interface IProps {
  label: string,
  information: string
}

const AccountInfo: React.FC<IProps> = ({ label, information }) => {
  return (
    <Box sx={{ fontFamily: 'Montserrat', marginTop: '15px', padding: '0 30px', display: 'flex', justifyContent: 'space-between'}}> 
      <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat' }}>
        {label}:
      </Typography>
      <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat', marginLeft: '25px', width: '50%', textAlign: 'start' }}>
        {information}
      </Typography>
    </Box>
  )
}

export default AccountInfo
