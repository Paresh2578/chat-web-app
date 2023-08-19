import React , {useState} from 'react'

//redux
import {useSelector} from 'react-redux'

//componets
import Menubar from './Menubar';
import Profile from './Profile';

//mui
import {Box , IconButton, styled} from '@mui/material'

//css
const Main_Box = styled(Box)(({theme})=>({
    display: 'flex',
    height:'9vh',
    background: 'rgb(238,174,202)',
   background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
   "@media (max-width:400px) ":{
    height:'7vh'
}
}))


const Other_option = styled(Box)(({theme})=>({
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    marginLeft :'auto',
}))

export default function Header() {

  const [open , setOpen] = useState(false);

  return (
    <Main_Box>
       <Box style={{display:'flex' ,  justifyContent:'center'  , alignItems:'center'}}>
           <Profile open = {open} setOpen={setOpen}/>
        </Box>
       <Other_option>
           <Box>
               <Menubar setOpen={setOpen}/>
           </Box>
       </Other_option>
    </Main_Box>
  )
}
