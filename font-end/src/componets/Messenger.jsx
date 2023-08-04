import React from 'react'

//redux
import {useSelector} from  'react-redux'

//mui
import { Box } from '@mui/material';

//componets
import SignUp from './Account/registrationForm/SignUp'
import Home from './Home/Home';

export default function Messenger() {

   let auth = localStorage.getItem('userData');

  return (
    <Box>
      {
        auth ? <Home/> : <SignUp/>
      }
    </Box>
  )
}
