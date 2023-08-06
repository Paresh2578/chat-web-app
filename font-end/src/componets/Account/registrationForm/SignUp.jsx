    import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom';
import { URL } from '../../URL';


//google sign
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

//mui
import { Typography , Alert , styled , Box} from '@mui/material'


//css
const AlrtBox = styled(Typography)(({theme})=>({
    color:'red',
    marginTop:'-18px',
    marginBottom:'5px',
    paddingLeft:'40px',
    fontSize:'15px',
    "@media (max-width:390px) ":{
        fontSize:'10px'
    }
 }))

//main function
const SignUp  = ()=>{
    



    const navigate = useNavigate();

    const [username , setName] = useState('')
    const [email , setEmail] = useState('')
    const [number , setNumber] = useState('')
    const [password , setPassword] = useState('')

    //alrt
    const [nameAlrt , setNameAlrt] = useState(false)
    const [emailAlrt , setEmailAlrt] = useState(false)
    const [numberAlrt , setNumberAlrt] = useState(false)
    const [passwordAlrt , setPasswordAlrt] = useState(false)

    //alrady user register checked
    const [userFind  , setUserFind] = useState(false);


    //post data in database
    const postData_database = async(username , email , password  , profile , about)=>{
        try{
            // let UserFind_result = await fetch(`${URL}/userFind/${email}`);
            let UserFind_result = await fetch(`http://localhost:4000/userFind/${email}`);
            UserFind_result = await UserFind_result.json();
            if(Object.keys(UserFind_result).length > 0){
               setUserFind(true)
            }else{
               setUserFind(false);
               //api call
               try{
                // let postUser_result = await fetch(`${URL}/register` , {
                let postUser_result = await fetch(`http://localhost:4000/register` , {
                    method : "post",
                    body:JSON.stringify({username , email , password  , profile , about}),
                    headers : {
                        "Content-Type":"application/json",
                    // "Accept":"application/json"
                    }
                });
    
                postUser_result =await postUser_result.json();
                localStorage.setItem('userData' , JSON.stringify(postUser_result));
                navigate('/Home')
           }catch(error){
            console.log(error);
           }
            }    
        }catch(error){
           console.log(error);
        }
       
    }

   //google with signUp
   const onLoginSucces = (res)=>{
    const decode = jwt_decode(res.credential);

    let username = decode.name;
    let email = decode.email;
    let password = decode.sub;
    let profile = decode.picture;
    let about = "Available"

    postData_database(username , email , password , profile , about);
   }
   const onLoginError = ()=>{}

   let clickCount = 0;

    const handleSignUp = async()=>{
        //name validation
        if(username.length < 4){
            setNameAlrt(true);

        }else{
            setNameAlrt(false);
        }

        //email validation
        let emailPatten = "^[a-z0-9]{1,20}@gmail\\.com$"
        let rEmail = new RegExp(emailPatten);

        if(rEmail.test(email)){
            setEmailAlrt(false);
        }else{
            setEmailAlrt(true)
        }

        //password validation
        let passwordPatten = "^[A-Za-z0-9!@#$%^&*]{8,15}$"
        let RPassword = new RegExp(passwordPatten);


        if(RPassword.test(password)){
             setPasswordAlrt(false)
        }else{
            setPasswordAlrt(true);
        }

        //mobile number validation
        let numberPatten = "^[0-9]{10}$"
        let RNumber = new RegExp(numberPatten);
         
        if(RNumber.test(number)){
            setNumberAlrt(false);
        }else{
            setNumberAlrt(true);
        }



     //post user ditil
      if(username.length !== 0 && email.length !== 0 && password.length !== 0){
        if(!nameAlrt && !emailAlrt && !passwordAlrt){
            if(clickCount >= 1){
                let profile = 'https://paresh2578.github.io/project-img/ChatAs/userimg/profile1.png';
               let about = "Available"
                postData_database(username , email , password , profile , about);
                clickCount = 0;
            }
            clickCount++;
         }
      }
    }

    return (
          <>
        
        <Box className="container" style={{background : '#f2f2f2' }}>
            <Box className="wrapper" style={{margin:'0px' , background : '#FFFF' }}>
                <Box className="title"><span>SignUp Form</span></Box>
                <form>
                {
                    userFind && <Alert  severity="error" style={{marginBottom:'5px'}}>email id alredy register</Alert>
                }
                <Box className="row">
                    <i className="fas fa-user"></i>
                    <input type="text" value={username} id='name' placeholder="name " onChange={(e)=>{(setName(e.target.value))}} required/>
                </Box>
                {
                    nameAlrt && <AlrtBox>* name length  must  be greter then 3</AlrtBox>
                }
                <Box className="row">
                    <i className="fas fa-envelope"></i>
                    <input type="email" placeholder="Email " value={email} onChange={(e)=>{(setEmail(e.target.value))}} required/>
                </Box>
                {
                    emailAlrt && <AlrtBox>* email is abc@gmail.com</AlrtBox>
                }
                <Box className="row">
                    <i className="fas fa-key"></i>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>{(setPassword(e.target.value))}} required/>
                </Box>
                {
                    passwordAlrt && <AlrtBox>* password  length greter than 8 to 15 </AlrtBox>
                }
                <Box className="row button">
                    <input type="button" value="Sign up" onClick={handleSignUp}/>
                </Box>
                {/* <Box style={{justifyContent:'center' , paddingLeft:'10%'}}>
                       <GoogleLogin 
                            onSuccess={onLoginSucces}
                              onError={onLoginError}
                              
                       />
                </Box> */}
                <Box className="signup-link" style={{ color : 'black' }}>Alredy account ? <Link to={'/logIn'}>Login now</Link></Box>
                </form>
            </Box>
            </Box>
        </>
    )
}

export default SignUp

