import React, { useState } from 'react'

//backend databse connect url
import {URL} from '../../../util/URL'

//redux
import { useSelector , useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { msg_user_info } from '../../../state';

//constom function
import {SweetAlrt} from '../../../util/SweetAlrt'

///mui
import { Box , styled , IconButton , Drawer, Typography , InputBase} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

//css
const Main_Box = styled(Box)(({theme})=>({
    "img" : {
      width : '40px',
      borderRadius : '40%'
    }
  }))

  const Profile_main_box = styled(Box)(({theme})=>({
    background : '#f2f2f2'
  }))

const Profile_header = styled(Box)(({theme})=>({
    heigth : '40vh',
    background: '#FE46A5',
    // background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    padding : '20px 10px',
    display : 'flex',
     "p" : {
        // margin : '10px 20px 10px 10px',
        fontWeight : 'bold',
        color : "#FFFFF7",
        fontSize:'30px',
        fontFamily:  'Sans-serif'
    }
}))

const Profile_img = styled(Box)(({theme})=>({
    heigth:'100px',
    display:'flex',
    justifyContent : 'center',
    // alignItems:'center',
    // margin:'auto',
    "img" : {
        borderRadius:'50%',
        heigth : '250px',
        width:'180px',
        margin : '20px 0px'
    }, 
  }))

const Profile_name = styled(Box)(({theme})=>({
     background : '#ffff',
     padding : '20px',
     margin:'10px 0px'
}))

const Profile_change = styled(Box)(({theme})=>({
    // background:'red'
}))

const DrowerStyle = {
    width:'350px',
    shadow : 'none'
}

const About = styled(Box)(({theme})=>({
  display:'flex',
}))

const About_value = styled(InputBase)(({theme})=>({
}))

const Edting_about = styled(Box)(({theme})=>({
   color: 'red',
   marginLeft:'auto'
}))

export default function Profile({open ,  setOpen}) {
  //redux
   const userdate = useSelector(state=> state.Auth)
   let dispatch = useDispatch();
   let {Auth} = bindActionCreators(msg_user_info , dispatch);

   //userdate
   let auth = JSON.parse(localStorage.getItem('auth'));

  
    const [username , setUsername] = useState(auth[0].username);
    const [name_disabled , setName_disabled] = useState(true);
    const [name_editing_display , setName_editing_display] = useState(false);
    const [about , setabout] = useState(auth[0].about);
    const [about_disabled , setAbout_disabled] = useState(true);
    const [about_editing_display , setAbout_editing_display] = useState(false);

    const handleClose = ()=>{
        setOpen(false);
    }


  const handle_profilechange = async(e)=>{

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload= async ()=>{
      let profile = reader.result;

      let auth_after_date = auth[0];
      auth_after_date = {...auth_after_date , profile};
      Auth(auth_after_date);
      
      localStorage.setItem('auth' , JSON.stringify(auth_after_date));

      try{
          let result = await fetch(`${URL}/use/name/nameUpdate/${auth[0].email}` , {
            method : 'put',
            body : JSON.stringify({profile}),
            headers : {
              "Content-Type": "application/json"
            }
          })
          result = await result.json();
      }catch(error){
        SweetAlrt("name update" ,"error");
        console.log("chanGe profil api error : " + error);
      }

    }
    reader.onerror= (error)=>{
      SweetAlrt("profile change " , "error");
      console.log("profile change error : " + error);
    }
    
  }


    const handle_name_upadate = (e)=>{
      setUsername(e.target.value);
    }

    const handle_edting_name = ()=>{
      setName_disabled(false)
      setName_editing_display(true);
     

    }

    const handle_name_save = async()=>{
      setName_disabled(true)
      setName_editing_display(false)

      let auth_after_date = auth[0];
      auth_after_date = {...auth_after_date , username};
      Auth(auth_after_date);
      localStorage.setItem('auth' , JSON.stringify(auth_after_date));


      try{ 
      let result = await fetch(`${URL}/use/name/nameUpdate/${auth[0].email}` , {
        method : 'Put',
        body : JSON.stringify({username}),
        headers : {
          "Content-Type": "application/json"
        }
      })
       result = await result.json();
      }catch(error){
        SweetAlrt("name update" , "error");
        console.log("user name upadte api error : " + error);
      }
    }

    const handle_about_upadate = (e)=>{
      setabout(e.target.value);
    }

    const handle_edting_about = ()=>{
      setAbout_disabled(false)
      setAbout_editing_display(true);
    }

    const handle_about_save = async()=>{
      setAbout_disabled(true);
      setAbout_editing_display(false);

      try{ 
        let result = await fetch(`${URL}/use/name/nameUpdate/${auth[0].email}` , {
          method : 'Put',
          body : JSON.stringify({about}),
          headers : {
            "Content-Type": "application/json"
          }
        })
         result = await result.json();
        }catch(error){
          SweetAlrt("name update" , "error");
          console.log("user name upadte api error : " + error);
        }

        let auth_after_date = auth[0];
        auth_after_date = {...auth_after_date , about};
        Auth(auth_after_date);
        localStorage.setItem('auth' , JSON.stringify(auth_after_date));
    }


   

  return (
    <Main_Box>
        <IconButton onClick={()=>setOpen(true)}>
           <img src={auth[0].profile} alt='logo'/>
         </IconButton>
         <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{sx: DrowerStyle}}
            style={{width : '350px'}}
            >
            <Profile_main_box>
                 <Profile_header >
                   <IconButton style={{color:'#FFFF' , marginRight:'1vh'}}>
                     <KeyboardBackspaceIcon onClick={handleClose}/>
                   </IconButton>
                   <Typography>Profile</Typography>
                 </Profile_header>
                 <Box>
                  <Profile_img>
                      <Profile_change >
                          <label htmlFor='fileinput'>
                            <img src={auth[0].profile}/>
                          </label>
                      </Profile_change> 
                      <input type='file'  id='fileinput' style={{display:'none'}} onChange={handle_profilechange}/>
                  </Profile_img>
                 </Box>
                 <Box style={{background:'#f2f2f2'}}>
                    <Profile_name>
                        <Box >
                            <Typography style={{color : '#008B8B' , marginBottom :'10px'}}>Your name</Typography>
                            <About>
                               <About_value type="text"  value={username} onChange={handle_name_upadate} disabled={name_disabled}/>
                               <Edting_about>
                                  <IconButton style={{display : name_editing_display ? "none" :'block'}}>
                                        <EditIcon onClick={handle_edting_name} id='about_editing_icon' />
                                  </IconButton>
                                  <IconButton style={{display : name_editing_display ? "block" :'none'}}>
                                      <DoneIcon onClick={handle_name_save} />
                                  </IconButton>
                               </Edting_about>
                            </About>
                        </Box>
                    </Profile_name>
                    <Profile_name>
                        <Box >
                            <Typography style={{color : '#008B8B' , marginBottom :'10px'}}  >about</Typography>
                            <About>
                               <About_value type="text"  value={about} onChange={handle_about_upadate} disabled={about_disabled}/>
                               <Edting_about>
                                  <IconButton style={{display : about_editing_display ? "none" :'block'}}>
                                        <EditIcon onClick={handle_edting_about} id='about_editing_icon'/>
                                  </IconButton>
                                  <IconButton style={{display : about_editing_display ? "block" :'none'}}>
                                      <DoneIcon onClick={handle_about_save}/>
                                  </IconButton>
                               </Edting_about>
                            </About>
                        </Box>
                    </Profile_name>
                 </Box>
            </Profile_main_box>
      </Drawer>
    </Main_Box>
  )
}
