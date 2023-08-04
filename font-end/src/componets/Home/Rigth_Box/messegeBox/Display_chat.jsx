import React from 'react'

//formet time
import {formetTime} from '../../../../util/FormentTime'

//mui
import { Box  , Typography, styled} from '@mui/material'

//csss
const Sender_msg_style = styled(Box)(({theme})=>({
    background:' #9191F2',
    maxWidth:'60%',
    marginLeft:'auto',
    padding:'5px 7px',
    width:'fit-content',
    display:'flex',
    borderRadius:'10px',
    wordBreak:'break-word',
    marginTop :'5px',
    color:'#fffff7'
}))

const Receiver_msg_style = styled(Box)(({theme})=>({
    background:' #ffff',
    maxWidth:'60%',
    padding:'5px 7px',
    width:'fit-content',
    display:'flex',
    borderRadius:'10px',
    wordBreak:'break-word',
    marginTop :'5px',
    color:'#454545',
}))

const Text = styled(Typography)(({theme})=>({
    padding: '0 25px 0 5px'
}))

const Time_style = styled(Typography)(({theme})=>({
    fontSize:'12px',
    marginTop:'auto',
    color:'#f2f2f2',
    // marginTop:'17px',
    wordBreak:'keep-all',
}))

export default function Display_chat({msg , auth}) {
  return (
    <Box>
        {
           msg.sender_ID == auth.email ? 
            <Sender_msg_style >
                <Text>{msg.text}</Text>
                <Time_style>{formetTime(msg.updatedAt)}</Time_style>
            </Sender_msg_style> 
           :
           <Receiver_msg_style>
               <Text>{msg.text}</Text>
               <Time_style style={{color : '#696969'}}>{formetTime(msg.updatedAt)}</Time_style>
          </Receiver_msg_style>
         }
     </Box>
  )
}
