import React, { useEffect, useState } from 'react'

//redux
import { useSelector , useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'
import {msg_user_info } from '../../../state/index'

//componets
import Empty_Box from './Empty_Box'
import MassegeBox from './messegeBox/MassegeBox'

//mui
import { Box , styled } from '@mui/material'

//css 
const Main_Box =styled(Box)(({theme})=>({
}))

export default function Rigth_box() {
  //redux
 const msg_user_info = useSelector(state=>state.msg_userInfo);


  return (

    <Main_Box >
       {
        Object.keys(msg_user_info).length != 0 ?
        <MassegeBox/>
         : <Empty_Box/>
        }
    </Main_Box>
  )
}
