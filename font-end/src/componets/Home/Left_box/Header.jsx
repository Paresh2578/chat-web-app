import React from 'react'

//redux
import {useSelector} from 'react-redux'

//componets
import Menubar from './Menubar';
import Profile from './Profile';

//mui
import {Box , IconButton, styled} from '@mui/material'
import MessageIcon from '@mui/icons-material/Message';

//css
const Main_Box = styled(Box)(({theme})=>({
    display: 'flex',
    padding : '5px 10px',
    background: 'rgb(238,174,202)',
   background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',

}))


const Other_option = styled(Box)(({theme})=>({
    display: 'flex',
    marginLeft :'auto',
}))

export default function Header() {

  return (
    <Main_Box>
       <Profile/>
       <Other_option>
           <Box>
              <IconButton >
                 <MessageIcon/>
              </IconButton>
           </Box>
           <Box>
               <Menubar/>
           </Box>
       </Other_option>
    </Main_Box>
  )
}
