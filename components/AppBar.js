import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const LineBar = styled(AppBar)(() => ({
  height: '65px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
}))

const AppBarMenu = ({ heading, group, monthPicker, children, links }) => {
  const router = useRouter()

  const [selectValue, setSelectValue] = useState('Group');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSelect = (e) => {
    setSelectValue(e.target.value)
  }

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const navigateTo = (e) => {
    const link = e.target.innerText.toLowerCase()
    
    if (link.length >= 1) {
      router.push(`/${link}`)    
    } 
  }

  return (
    <LineBar position="static" color='secondary'>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon onClick={openMenu} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            onClick={navigateTo}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
              {links.map(link => 
                <MenuItem value={link} key={link}> {link} </MenuItem>
              )}
          </Menu>
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Montserrat' }}>
          {heading}
        </Typography>

        {children && children}

        {group &&
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectValue}
            onChange={handleSelect}
            sx={{ marginRight: '25px', fontFamily: 'Montserrat', maxHeight: '32px', backgroundColor: '#FFF' }}>
            <MenuItem value='Group'> Group </MenuItem>
            <MenuItem value='Person 1'> Person 1 </MenuItem>
            <MenuItem value='Person 2'> Person 2 </MenuItem>
          </Select>
        }
        
        {monthPicker && <input type='month' className='monthPicker' />}
        
      </Toolbar>
    </LineBar>
  )
}

export default AppBarMenu
