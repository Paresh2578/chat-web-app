import React  , {useContext , useState , useEffect} from 'react'


//redux
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {msg_user_info} from '../../state/index'

//user displly width get  using context provider
import {home_box_width_context}  from '../../App'



//componets
import Left_box from './Left_box/Left_box'
import Rigth_box from './Rigth_Box/Rigth_box'

//mui
import { Box , styled } from '@mui/material'

//css
const Main_Box = styled(Box)(({theme})=>({
     margin:'0px',
     display : 'flex'
}))

const Left_Box_style = styled(Box)(({theme})=>({
   width:'35%',
   "@media (max-width:830px) " : {
    width : '40%'
   },
   "@media (max-width:750px) " : {
    width : '100%'
   }
}))

const Rigth_box_style = styled(Box)(({theme})=>({
   width:'65%',
   "@media (max-width:830px) " : {
    width : '60%'
   },
   "@media (max-width:750px) " : {
    width:'100%',
  }
}))

export default function Home() {
  let {user_disply_box_width , user_messgeBox_width} = useContext(home_box_width_context);

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

  //redux
  let dispatch = useDispatch();
  let {Auth} = bindActionCreators(msg_user_info , dispatch);

  const auth = JSON.parse(localStorage.getItem('userData'));
  useEffect(()=>{
    Auth(auth);
  },[])


  return (
    <Main_Box>
        <Left_Box_style style={{display: windowSize[0] <= 750 ? `${user_disply_box_width}`:'block'}}>
            <Left_box />
        </Left_Box_style>
        <Rigth_box_style  style={{display: windowSize[0] <= 750 ? `${user_messgeBox_width}`:'block'}}>
            <Rigth_box/>
        </Rigth_box_style>
    </Main_Box>
  )
}
