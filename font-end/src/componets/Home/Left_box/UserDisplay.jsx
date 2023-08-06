import React, { useEffect, useState , useContext } from 'react'
import  {socket_context_api , home_box_width_context} from '../../../App'


//url
import {URL} from '../../URL'

//redux
import { useDispatch  , useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {msg_user_info} from '../../../state/index'


//time formet function
import {formetTime} from '../../../util/FormentTime'

//mui
import {Box , styled, List , ListItem, Divider, Typography, ListItemButton} from '@mui/material'

//css
const Main_box = styled(List)(({theme})=>({
  overflow: 'overlay',
  height: '88vh',
  "::-webkit-scrollbar"  : {
    display: "none"
}
}))

const Imgs = styled('img')({
    width : '50px',
    margin:' 0 10px',
    // borderRedius:'50%',
    objectFit:'cover',
    borderRadius : '50%'
})


const User_name = styled(Box)(({theme})=>({
   marginTop:'-5px',
}))

const Last_msg_time = styled(Box)(({theme})=>({
  marginLeft:'auto',
  marginBottom:'auto',
  opacity:'0.4'
}))

const Last_msg = styled(Typography)(({theme})=>({
  fontSize:'12px',
  color:'grey'
}))

//main function
export default function UserDisplay({text , convarstion_last_msg_redux}) {

  let {socket , setActive_user} = useContext(socket_context_api);
  let {setUser_disply_box_width , setUser_messgeBox_width} = useContext(home_box_width_context)

    //auth
    let auth = JSON.parse(localStorage.getItem('userData'));
    
  // //  //redux
     const dispatch = useDispatch();
     const {User , Last_msg_convarsation} = bindActionCreators(msg_user_info , dispatch);
  
   const [user , setUser] = useState([]);

  //get all user
   useEffect(()=>{
      const getUser = async ()=>{
        try{
          let result = await fetch(`${URL}/get_AllUser`)
          result =await result.json();
          result = result.filter(user => user.username.toLowerCase().includes(text.toLowerCase()))
          setUser(result);
        }catch(error){
            console.log(error);
        }
       }
    getUser();
   }, [text])

   
    //handle_Msg_user
      const handle_Msg_user = (data)=>{
       User(data)

    //set converstion
    const set_convartioan = async ()=>{
      let sender_email = auth.email;
      let receiver_email = data.email;
      let messege = "";

      const member = [sender_email , receiver_email]
        
      try{
            let UserFind_result = await fetch(`${URL}/convarsation/${sender_email}/${receiver_email}` , {
                   method : "post",
                  body:JSON.stringify({member , messege}),
                  headers : {
                              "Content-Type":"application/json",
                              "Access-Control-Allow-Origin" :"*",
                            }
          });
      }catch(error){
        console.log("convarstion api erroe : " + error)
      }


      //set userlist displye with and messge box width
       setUser_disply_box_width('none');
       setUser_messgeBox_width('block');

    }

    set_convartioan();
}

 useEffect(()=>{
    socket.emit("addusers", auth);
    socket.on("getUsers", user=>{
      setActive_user(user)
    })
 },[auth])
   

  return (
      < >
       <Main_box>
          {
            user.filter(i=>i.email != auth.email).map((data , index)=>(
                <Box key={index} onClick={()=> handle_Msg_user(data)}>
                        <ListItemButton style={{margin:'0px' , paddingLeft:'0px'}}>
                          <Imgs src={data.profile} alt='profile' />
                          <Box>
                             {/* <User_name style={{marginTop :convarstion_last_msg_redux.length != undefined ? ( convarstion_last_msg_redux.find(con => con.member.some(i=> i == data.email)).messege.length < 2 ? '-15px' : '0px') : ""}}>{data.username}</User_name> */}
                             <User_name style={{}}>{data.username}</User_name>

                            <Last_msg >
                               {
                      
                                  (convarstion_last_msg_redux.length != undefined && convarstion_last_msg_redux.length != 0) ? 
                                      (convarstion_last_msg_redux.filter(user => user.member[0] === auth.email  && user.member[1]=== data.email)[0]  != undefined) ?
                                          convarstion_last_msg_redux.filter(user => user.member[0] === auth.email  && user.member[1]=== data.email)[0].messege.length <15 ? 
                                            convarstion_last_msg_redux.filter(user => user.member[0] === auth.email  && user.member[1]=== data.email)[0].messege :
                                            convarstion_last_msg_redux.filter(user => user.member[0] === auth.email  && user.member[1]=== data.email)[0].messege.substring(0,14)+ "...."
                                          :
                                          
                                      convarstion_last_msg_redux.filter(user => user.member[1] === auth.email  && user.member[0]=== data.email)[0]  != undefined ?
                                          convarstion_last_msg_redux.filter(user => user.member[1] === auth.email  && user.member[0]=== data.email)[0].messege.length < 15 ? 
                                             convarstion_last_msg_redux.filter(user => user.member[1] === auth.email  && user.member[0]=== data.email)[0].messege : 
                                             convarstion_last_msg_redux.filter(user => user.member[1] === auth.email  && user.member[0]=== data.email)[0].messege.substring(0,14)+ "...."
                                          : " "
                                     : " "     
                               }  
                            </Last_msg>
                          </Box>
                          <Last_msg_time>
                             <Typography>
                             {
                      
                                  (convarstion_last_msg_redux.length != undefined && convarstion_last_msg_redux.length != 0) ? 
                                      (convarstion_last_msg_redux.filter(user => user.member[0] === auth.email  && user.member[1]=== data.email)[0]  != undefined) ?
                                         formetTime(convarstion_last_msg_redux.filter(user => user.member[0] === auth.email  && user.member[1]=== data.email)[0].updatedAt) :
                                          
                                      convarstion_last_msg_redux.filter(user => user.member[1] === auth.email  && user.member[0]=== data.email)[0]  != undefined ?
                                           formetTime(convarstion_last_msg_redux.filter(user => user.member[1] === auth.email  && user.member[0]=== data.email)[0].updatedAt)
                                          : " "
                                    : " "     
                              } 
                             </Typography>
                          </Last_msg_time>
                        </ListItemButton>
                   <Divider style={{opacity : '0.5'}}/>
                </Box>
               
            ))
          }
         
       </Main_box>
    </>
  )
}
