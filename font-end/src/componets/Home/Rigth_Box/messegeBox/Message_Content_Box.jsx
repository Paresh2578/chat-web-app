import React, { useEffect, useState , useRef } from 'react'

// backend url
import {URL} from '../../../../util/URL'

//componets
import Display_chat from './Display_chat'


//mui
import {Box , Typography, styled, ListItemButton , Divider} from '@mui/material'

//css
const Main_Box = styled(Box)(({theme})=>({
  height:'94vh',
  overflow: 'overlay',
  "::-webkit-scrollbar"  : {
    display: "none"
   },
  backgroundImage: `url(${'https://paresh2578.github.io/project-img/ChatAs/userimg//chat_background.png'})`,
  padding:'0px 20px ',
  paddingBottom:'6rem'
}))


export default function Message_Content_Box({msg_user_informaton  , massege}) {
  // msg_sender
  let auth = JSON.parse(localStorage.getItem('auth'));

  //use ref
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" })
}, [massege]);

  
  return (
    <Main_Box >
      {/* pares chaudhart */}
     {
      

      massege && massege.map((msg , index)=>(
         <Box ref={scrollRef} key={index}>
            <Display_chat msg={msg} auth={auth} />
         </Box>
      ))
     }
   
 </Main_Box>
  )
}

