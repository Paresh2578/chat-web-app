import React from 'react'


//backent url
import { URL } from '../../../URL';

//redux
//redux
import { useDispatch  , useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {msg_user_info} from '../../../../state/index'

//mui
import { Box , IconButton, styled } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Menubar({setMassege ,conversation_ID}) {
  //redux
  const dispatch = useDispatch();
  const {Last_msg_convarsatio} = bindActionCreators(msg_user_info , dispatch);
  const convarstion_last_msg_redux = useSelector(state=>state.last_msg_user);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  const handle_deleter_msg =async ()=>{
    try{
       let result = await fetch(`${URL}/messge/delete/${conversation_ID}`, {
        method : "Delete"
       })
       result = await result.json();
    }catch(error){
      console.log("deleter api error from font : " + error);
    }

    handleClose();
    setMassege();

    let last_msg_user_delete =  convarstion_last_msg_redux.filter(msg=> msg._id != conversation_ID);
    Last_msg_convarsatio(last_msg_user_delete);

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
        <MenuItem onClick={handle_deleter_msg}>delete all Messenger</MenuItem>
      </Menu>
    </>
  )
}
