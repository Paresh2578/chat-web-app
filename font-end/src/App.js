import React, { createContext, useEffect, useState  , useRef} from 'react'
import { BrowserRouter  ,Route ,Routes  } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { io } from 'socket.io-client';

//componets
import Messenger from './componets/Messenger'
import Login from './componets/Account/registrationForm/Login'
import SignUp from './componets/Account/registrationForm/SignUp'
import Forget_password from './componets/Account/registrationForm/Forget_password'
import Home from './componets/Home/Home';

//mui
import { Box } from '@mui/material'


const socket = io.connect("http://localhost:5000")
const socket_context_api = createContext();
const home_box_width_context = createContext();

 const   App = () => {
    const clientId = '987191941010-oa6u188vj4v5hsp1plksjpvq99ho790b.apps.googleusercontent.com'

    const[active_user , setActive_user] = useState([])
    const [user_disply_box_width , setUser_disply_box_width] = useState('block');
    const [user_messgeBox_width  ,  setUser_messgeBox_width] = useState('none');

    useEffect(()=>{
      // setUser_messgeBox_width('block')
    })


  return (
          <socket_context_api.Provider value={{socket ,  active_user  ,  setActive_user}}>
            <home_box_width_context.Provider value={{user_disply_box_width , setUser_disply_box_width , user_messgeBox_width  , setUser_messgeBox_width}}>
              <GoogleOAuthProvider clientId={clientId}>
                    <BrowserRouter>
                      <Box>
                          <Routes>
                            <Route path='/' element={<Messenger/>}></Route>
                            <Route path='/Home' element={<Home/>}></Route>
                            <Route path='/logIn' element={<Login/>}></Route>
                            <Route path='/SignUp' element={<SignUp/>}></Route>
                            {/* <Route path="/home/profile" element={<Profile/>}></Route> */}
                            <Route path='/Forget_password' element={<Forget_password/>}></Route>
                          </Routes>
                      </Box>
                  </BrowserRouter>
              </GoogleOAuthProvider>
            </home_box_width_context.Provider>
          </socket_context_api.Provider>
  )
}

export default App;
export {socket_context_api , home_box_width_context}


