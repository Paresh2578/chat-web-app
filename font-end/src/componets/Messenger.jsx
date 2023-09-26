import React from 'react'

//redux
import {useSelector} from  'react-redux'

//mui
import { Box } from '@mui/material';

//componets
// import LogIn from './Account/registrationForm/Login'
import Home from './Home/Home';
import Authentication from './Authentication/Authentication';


export default function Messenger() {

   let auth = localStorage.getItem('auth');

  return (
    <Box>
      {
        auth ? <Home/> : <Authentication/>
      }
    </Box>
  )
}
