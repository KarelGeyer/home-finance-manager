import { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

import AccountInfo, {IProps as AccountInfoProps} from "../../components/AccountInfo";
import AppBarMenu from "../../components/AppBar";
import EditAccount from "../../components/EditAccount";

import img from '../../public/witcher.jpg'

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


const Account: React.FC = () => {
  const links: string[] = ['overview', 'transactions', 'calculator']
  const user: {information: string, label: string}[] = [
    {
      information: 'Karel',
      label: 'Name'
    },
    {
      information: 'Geyer',
      label: 'Surname'
    },
    {
      information: 'karelgeyer@gmail.com',
      label: 'Email'
    },
    {
      information: '603 429 067',
      label: 'Phone Number'
    },
    {
      information: 'EUR',
      label: 'Default Currency'
    },
    {
      information: 'Account ID',
      label: 'HjsR158Sdd6'
    },
    {
      information: 'Team ID',
      label: 'kgln603781'
    },
  ]

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const openModal = (): void => setModalOpened(true);
  const closeModal = (): void => setModalOpened(false);

  return (
    <Section sx={{ fontFamily: 'Montserrat' }}>
      <AppBarMenu heading='Account'  links={links}>
        <IconButton
          onClick={openModal} 
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
        >
          <DeleteIcon />
        </IconButton>
      </AppBarMenu>  
      
      <GridContainer container xs={12} md={12} sx={{ padding: '20px' }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid black', margin: '50px 0 0 250px', width: '350px', height: '350px', borderRadius: '100%', overflow: 'hidden', position: 'relative' }}>
            <Image src={img} alt='image' layout='fill' objectFit='cover' />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
        <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch', },
        }}>
          <Typography variant="h5" sx={{ fontFamily: 'Montserrat',  padding: '0 30px', marginBottom: '50px', objectFit: 'cover' }}>
            My Account
          </Typography>

          {user.map((information: AccountInfoProps, index: number) => (<AccountInfo label={information.label} information={information.information} key={index}/>))}

          <Modal
            open={modalOpened}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box component='form' sx={{ backgroundColor: 'white', width: '50%', height: '50vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', padding: '10px 35px'}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between'}}> 
                <Typography variant="h5" sx={{ fontFamily: 'Montserrat', margin: '0 0 0px 0', padding: '12px' }}>
                  Edit Account
                </Typography>
                <IconButton
                  onClick={closeModal} 
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{margin: 0, height: '50px', width: '50'}}
                >
                  <CancelIcon/>
                </IconButton>
              </Box>
            
              <EditAccount closeModal={closeModal} />
            </Box>
          </Modal>
        </Box>
        </Grid>
      </GridContainer>

    </Section>
  )
}

export default Account
