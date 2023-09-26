import React, { createContext, useEffect, useState  , useRef} from 'react'
import { BrowserRouter  ,Route ,Routes  } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { io } from 'socket.io-client';

//componets
import Messenger from './componets/Messenger'
import Home from './componets/Home/Home';
import Authentication from './componets/Authentication/Authentication';
import Developer_detail from './componets/developer detail/Developer_detail'

//mui
import { Box } from '@mui/material'


const socket = io.connect("https://chatappsocket-i.onrender.com")
// const socket = io.connect("http://localhost:5000")
const socket_context_api = createContext();
const home_box_width_context = createContext();

 const   App = () => {
    const clientId = '588531370011-bcfue6g9jhso48absmqq992f6hrgbqgj.apps.googleusercontent.com'

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
                            <Route path='/Authentication' element={<Authentication/>}/>
                            <Route path='/Developer_detail' element={<Developer_detail/>}/>
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


