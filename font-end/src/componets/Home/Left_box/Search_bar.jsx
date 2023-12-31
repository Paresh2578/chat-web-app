import React, { useState } from 'react'

//mui
import {Box , styled} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//css
const Main_Box = styled(Box)(({theme})=>({
    margin:'10px',
    background: '#f2f2f2',
    display:'flex',
    alignItems:'center',
    paddingLeft:'10px',
    borderRadius : '10px',
    height:'6vh'
}))

const Input_Box = styled('input')((theme)=>({
    border:'none',
    background : '#f2f2f2',
    width:'90%',
    ":focus": {
        outline: 'none'
    },
    marginLeft:'5px',
    fontSize:'15px',
    color:'#919191',
}))

export default function Search_bar({setText}) {

  return (
    <Main_Box>
          <SearchIcon fontSize='small'/>
          <Input_Box type='text' placeholder='Search  users' onChange={(e)=>setText(e.target.value)} />
   </Main_Box>
  )
}
