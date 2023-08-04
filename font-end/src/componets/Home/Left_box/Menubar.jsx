import React from 'react'
import { useNavigate } from 'react-router-dom';

//mui
import { Box , IconButton, styled } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Menubar() {
   //navigate
   const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //handle_LogOut
    const handle_LogOut = ()=>{
         localStorage.clear('userData');
         navigate('/')
      handleClose();
    }

    
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical:'bottom',
            horizontal:'rigth'
        }}
      >
        <MenuItem onClick={()=>{handleClose()}}>Profile</MenuItem>
        <MenuItem onClick={handle_LogOut}>Logout</MenuItem>
      </Menu>
    </>
  )
}
