import React, { useEffect , useState, useContext } from 'react'

//URL
import {URL} from '../../../URL'

// socket  msg contex api
import {socket_context_api} from '../../../../App'

//redux
import { useDispatch , useSelector  } from 'react-redux';

//compones
import Header from './Header';
import Message_Content_Box from './Message_Content_Box';
import Footer from './Footer';

//mui
import {Box , styled} from '@mui/material'

//css

export default function MassegeBox() {
 // use conttext  api
 let {socket} = useContext(socket_context_api)

   //redux
   const msg_user_informaton = useSelector(state=>state.msg_userInfo);



    // msg_sender
    let auth = JSON.parse(localStorage.getItem('userData'));

   //messege
   const [massege , setMassege] = useState([]);
   const [file , setFile] = useState();
   const [text , setText] = useState("");
   const [conversation_ID , setConversation_ID] = useState('');


    useEffect(()=>{
      socket.on("chat" , (payload)=>{
        setMassege([...massege , payload]);
      })
     })  

   useEffect(()=>{
    get_conversation();
   },[msg_user_informaton.email])

    const get_conversation = async()=>{
      try{
        let result = await fetch(`${URL}/get_convarsation/${auth.email}/${msg_user_informaton.email}`)
        result =await result.json();
        setMassege(result);
    }catch(error){
      console.log("get convartion id api error : " + error)
    }
  }

    ///get  conversation_ID
    useEffect(()=>{
      const getconversationID = async()=>{
       try{
             let result =await fetch(`${URL}/get_convarsation_id/${auth.email}/${msg_user_informaton.email}`);
             result = await result.json();
             setConversation_ID(result._id);
         }catch(error){
           console.log("get convarsation id api error : " + error);
         }
    }
    getconversationID();
}, [msg_user_informaton.email])






  return (
    <Box >
             <Header msg_user_informaton ={msg_user_informaton} setMassege={setMassege} conversation_ID={conversation_ID}/>
          <Box styled={{heigth:'100vh'}}>
          <Message_Content_Box msg_user_informaton ={msg_user_informaton } massege = {massege} />
          </Box>
          <Footer msg_user_informaton ={msg_user_informaton} get_conversation= {get_conversation} conversation_ID={conversation_ID} file={file} setText={setText} text ={text}/>
    </Box>
  )
}
