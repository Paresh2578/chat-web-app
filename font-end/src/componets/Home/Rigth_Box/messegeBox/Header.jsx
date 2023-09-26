import React  , {useContext}from 'react'

//get socekt context api
import {socket_context_api , home_box_width_context} from '../../../../App'

//mui
import {Box , styled , IconButton, Typography} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';

//componets
import Menubar from './Menubar'

//css
const Main_Box = styled(Box)(({theme})=>({
  display:'flex',
  background:'#FFF',
  heigth:'10vh',
}))

const Left_Side = styled(Box)(({theme})=>({
  display:'flex',
  padding:'5px '
}))

const Rigth_side = styled(Box)(({theme})=>({
  marginLeft:'auto',
  display:'flex',
  alignItems:'center',
 justifyContent:'center'   
  // padding:'8px 0px'
}))

const Messeger_name = styled(Typography)(({theme})=>{

})

const Profile_box  = styled(Box)(({theme})=>({
  padding:'0px 5px 0px 2px',
 "@media (max-width:320px)" : {
  marginLeft:'-5px'
 }
}))



export default function Header({msg_user_informaton , setMassege, conversation_ID }) {
   
      const {active_user} = useContext(socket_context_api);
      const {setUser_disply_box_width , setUser_messgeBox_width} = useContext(home_box_width_context);
  
  return (
    <Main_Box>
       <Left_Side>
            <Box  style={{display:'flex' ,  justifyContent:'center'  , alignItems:'center'}}>
                    <IconButton size='small' onClick={()=> {setUser_disply_box_width('block') ; setUser_messgeBox_width('none')}}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
            </Box>
            <Profile_box  style={{display:'flex' ,  justifyContent:'center'  , alignItems:'center'}}>
                <img src={msg_user_informaton.profile} alt='logo' style={{heigth:'40px' , width : '40px'  ,  borderRadius : '50%'}}/>
            </Profile_box>
            <Box>
                {/* <Box> */}
                    <Messeger_name style={{}}>{msg_user_informaton.username}</Messeger_name>
                {/* </Box> */}
                <Typography style={{fontSize:'13px' , opacity:'0.7'}}>{active_user?.find(user => user.email == msg_user_informaton.email) ? "Online" : "Offline"}</Typography>
            </Box>
       </Left_Side>
       <Rigth_side>
        <Menubar setMassege={setMassege} conversation_ID={conversation_ID}/>
       </Rigth_side>
    </Main_Box>
  )
}
