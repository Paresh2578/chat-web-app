import React, { useEffect, useState } from 'react'

//URL
import {URL} from '../../URL'

//componets
import Header from './Header'
import Search_bar from './Search_bar'
import UserDisplay from './UserDisplay'

//redux
//redux
import { useDispatch  , useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {msg_user_info} from '../../../state/index'


//mui
import { Box , Divider, styled} from '@mui/material'

//css
const Main_Box = styled(Box)(({theme})=>({
    background:'#ffff',
    heigth:'200vh',
    overflowY:'scroll',
}))

export default function Left_box() {
  const [text , setText] = useState('');


  //redux
  const convarstion_last_msg_redux = useSelector(state=>state.last_msg_user);
  const dispatch = useDispatch();
  const { Last_msg_convarsatio} = bindActionCreators(msg_user_info , dispatch);


   //convarsaion  last msg
   useEffect(()=>{
       const get_last_msg = async()=>{
          try{
            let result = await fetch(`${URL}/convarsation/get_all_convarsation`);
            result = await result.json();
            Last_msg_convarsatio(result)
        }catch(error){
          console.log("get all last msg api error : " + error);
        }
       }
       get_last_msg();
   },[])

  return (
    <Main_Box>
             <Header/>
             <Divider/>
             <Search_bar setText={setText}/>
             <Divider style={{opacity : '1'}}/>
             <UserDisplay text={text} convarstion_last_msg_redux = {convarstion_last_msg_redux}/>
    </Main_Box>
  )
}
