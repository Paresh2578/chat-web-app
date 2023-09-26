import React, { useEffect, useState  , useContext} from 'react'

// backend URL
import {URL} from '../../../../util/URL'

//redux
import { useDispatch  , useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {msg_user_info} from '../../../../state/index'

//context api
import {socket_context_api} from '../../../../App'

//comstom function
import {SweetAlrt} from '../../../../util/SweetAlrt'

//mui
import { Box , IconButton, InputBase, styled  } from '@mui/material'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';

//css
const Main_Box = styled(Box)(({theme})=>({
  position:'absolute',
  background:'#ffff',
  bottom:'5px',
  display:'flex',
   margin : '10px 10px 10px 25px',
  alignItems:'center',
  width:'60%',
  heigth:'10vh',
  padding:'0px 10px ',
 borderRadius:'20px',

  "@media (max-width : 1400px)" : {
      marginLeft : '30px',
  },
  "@media (max-width : 950px)" : {
      marginLeft : '25px',
  },
  "@media (max-width : 850px)" : {
    width:'53%',
    marginLeft:'30px'
  },
  "@media (max-width : 750px)" : {
    width:'90%',  
    marginLeft:'30px'
  },
  "@media (max-width : 550px)" : {
    width:'92%',
    marginLeft:'20px'
  },
  "@media (max-width : 450px)" : {
    width:'95%',
    marginLeft:'10px'
  }
}))

const InputBase_Style = styled(InputBase)(({theme})=>({
  background :'#ffff',
  width:'85%',
  borderRadius:'10px',
  padding:'5px 10px',
  margin:'0px 5px'
}))



export default function Footer({msg_user_informaton , get_conversation,conversation_ID , file ,  setFile , text ,setText  }) {


  
   //find scrren width
   const [windowSize, setWindowSize] = useState([
    window.innerWidth,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener('resize', handleWindowResize);


    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const[sendIcon , setSendIcon] = useState(false);

  //socket context api
  let {socket}= useContext(socket_context_api);

  //redux
  const dispatch = useDispatch();
  const {User , Last_msg_convarsatio} = bindActionCreators(msg_user_info , dispatch);

  // msg_sender
 let auth = JSON.parse(localStorage.getItem('auth'));


 //handle onchange input
 const handle_onchangeInput = (e)=>{
   setText(e.target.value)
   e.target.value.length != 0 ? setSendIcon(true) : setSendIcon(false);
 }
    

  //set file
  useEffect(()=>{
    const getImge = async ()=>{
      // if(file){
        let formData = new FormData();
        formData.append("file1","file4");

          try{
              let result = await fetch(`${URL}/file/upload`, {
                method:'post',
                body : JSON.stringify(formData),
                headers : {
                  "Content-Type":"application/json",
                  "Access-Control-Allow-Origin" :"*",
                }
              })
          }catch(error){
            SweetAlrt("file upload " , "error");
            console.log("upload file api error : " + error);
          }

      // }
    }
    getImge();
  }, [file])

  //send msg information 
   const msg = {
      conversation_ID:conversation_ID,
      sender_ID : auth[0].email,
      receiver_ID : msg_user_informaton.email,
      text : text,
      type:'text'
   }

  //send msg
  const SendMsg = async()=>{
   //socket chat
    socket.emit("chat" , {...msg , updatedAt: Date.now()});

    //set sendicon
    setSendIcon(false);

    //chage last msg fro convastion
    try{
       let  messege = text
      let result = await fetch(`${URL}/convarsation/Change_msg/${conversation_ID}`, {
        method : "put",
        body:JSON.stringify({messege , timestamps : new Date()}),
        headers:{
            "Content-Type": "application/json"
        }
      })
    }catch(error){
      SweetAlrt("change conversation" , "error");
       console.log("changer msg put api error : " + error);
    }
 
      //convarsaion  last msg
      try{
            let result = await fetch(`${URL}/convarsation/get_all_convarsation`);
            result = await result.json();
            Last_msg_convarsatio(result)
        }catch(error){
          SweetAlrt("get all convarsation" , "error");
          console.log("get all convarstion api error : " + error);
        }
      

    
    //msg send
     try{
         let result = await fetch(`${URL}/messege` , {
          method:'post',
          body : JSON.stringify(msg),
          headers : {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin" :"*",
          }
         })

        result = await result.json() ;
     }catch(error){
      SweetAlrt("send msg" , "error");
      console.log("send msg api error : " + error)
     }
    setText('')
    // setFile();
    get_conversation();
  }

  //sendFile
  const sendFile = (e)=>{
    setText(e.target.files[0].name)
    setFile(e.target.files[0])
  }


  return (
    <Box>
        <Main_Box>
        <IconButton>
          <SentimentSatisfiedOutlinedIcon style={{fontSize : windowSize[0] <= 650 ? '25px' : '25px'}}/>
        </IconButton>
            <IconButton >
        <label htmlFor="fileInput" style={{heigth:'8px'}}>
              <AttachFile style={{ rotate: '-45deg'}} />
        </label>
            </IconButton>
        <input
              type='file'
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e)=>sendFile(e)}
        />
        
        <InputBase_Style placeholder='Type a message' onChange={handle_onchangeInput} onKeyPress={(e) => e.key == "Enter" ? SendMsg() : '' } value={text}/>
        <IconButton  size='small'  style={{display : !sendIcon ? 'block' : 'none' , marginLeft:'auto'}} >
            <MicIcon/>
        </IconButton>
        <IconButton onClick={SendMsg} size='small' style={{display : sendIcon ? 'block' : 'none'}}>
            <SendIcon/>
        </IconButton>
      </Main_Box>
    </Box>
  )
}
