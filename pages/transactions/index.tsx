import { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';

import CancelIcon from '@mui/icons-material/Cancel';

import AppBarMenu from "../../components/AppBar";
import LineGraph from "../../components/LineGraph";
import Transaction, {IProps as TransactionProps} from "../../components/Transaction";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TRANSACTIONS_URL } from "../../assets/global";
import EditTransaction from "../../components/EditTransaction";

export interface IProps {
  transactions: Transaction[]
}

export interface Transaction {
    name: string,
    person: string,
    category: string,
    sum: number,
    currency: string,
    month?: string,
    isLoand?: boolean,
    tags?: string | string[]
    __v?: number
    _id: string
}

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

const Transactions: React.FC<IProps> = ({transactions}) => {
  const [filterValue, setFilterValue] = useState<string>('Group');
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = (): void => setModalOpened(true);
  const closeModal = (): void => setModalOpened(false);

  const links: string[] = ['overview', 'account', 'calculator']

  const selectFilter = (e: any) => {
    setFilterValue(e.target.value)
  }

  const formattedDatesFromTransactions: string[] = transactions.map((transaction: any) => {
    const formatterdDateArr = transaction.date.split('-')

    return `${formatterdDateArr[2]}.${formatterdDateArr[1]}`
  })

  const spendings: number[] = transactions.map((transaction: any) => transaction.sum)

  return (
    <Section sx={{ fontFamily: 'Montserrat' }}>
      <AppBarMenu heading='Transactions' group={true} monthPicker={true} links={links}> 
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, borderRadius: '50px', padding: '4px 10px 4px 4px', border: '1px solid white' }}
            onClick={openModal}
          >
            <AddCircleIcon fontSize='large'/>
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontFamily: 'Montserrat', margin: '2px' }}>
              Add New
            </Typography>
          </IconButton>
        </Box>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue='Sort by'
          value={filterValue}
          onChange={selectFilter}
          sx={{ marginRight: '25px', fontFamily: 'Montserrat', maxHeight: '32px', backgroundColor: '#FFF' }}>
          <MenuItem value='Group'> Date </MenuItem>
          <MenuItem value='Person 1'> Amount </MenuItem>
          <MenuItem value='Person 2'> User </MenuItem>
        </Select>
      </AppBarMenu>

      <GridContainer container sx={{ padding: '20px' }}>

        <Grid item xs={12} md={5} sx={{ textAlign: 'center', paddingTop: '30px', maxHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems:'center', overflow: 'scrollX' }}>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Montserrat', fontWeight: 600, marginBottom: '25px' }}>
            Transactions
          </Typography>
          <Box sx={{ overflow: 'scroll', overflowX: 'hidden'}}>
            
            {transactions && transactions.map((transaction: any) => (
              <Transaction 
                name={transaction.name} 
                user={transaction.person} 
                price={transaction.sum} 
                tags={transaction.tags}
                id={transaction._id}  
                key={transaction._id}/>
            ))}

          </Box>
        </Grid> 

        <Grid item xs={12} md={7} sx={{ textAlign: 'center', paddingTop: '20px' }}>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Montserrat', fontWeight: 600, marginBottom: '25px' }}>
            Spendings By Day
          </Typography>
          <Box sx={{ height: '400px' }}>
            <LineGraph labels={formattedDatesFromTransactions} data={spendings} />
          </Box> 
        </Grid>
       </GridContainer>

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
              <EditTransaction closeModal={closeModal} />
            </Box>
          </Modal>

    </Section>
  )
}

export const getServerSideProps = async ():Promise<any> => {
  const res: Response = await fetch(TRANSACTIONS_URL);
  const transactions: IProps = await res.json()

  return {
    props: {
      transactions
    }
  }
}

export default Transactions
