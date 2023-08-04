import React from 'react'
import empty from './imgs/empty.png'

//mui
import {Box , styled } from '@mui/material'

//css
const Main_Box =styled(Box)(({theme})=>({
    background:' hsla(259, 84%, 78%, 1)',
    background: 'linear-gradient(90deg, hsla(259, 84%, 78%, 1) 0%, hsla(206, 67%, 75%, 1) 100%)',
    background: '-moz-linear-gradient(90deg, hsla(259, 84%, 78%, 1) 0%, hsla(206, 67%, 75%, 1) 100%)',
    background:' -webkit-linear-gradient(90deg, hsla(259, 84%, 78%, 1) 0%, hsla(206, 67%, 75%, 1) 100%)',
    filter:' progid: DXImageTransform.Microsoft.gradient( startColorstr="#B597F6", endColorstr="#96C6EA", GradientType=1 )'
}))

export default function Empty_B0x() {
  return (
    <Main_Box>
        <img src={empty} style={{width:'100%' , height:'100vh'}}/>
    </Main_Box>
  )
}
