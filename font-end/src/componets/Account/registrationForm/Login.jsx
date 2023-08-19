import React , {useState} from 'react'
import './Login.css'
import {Link , useNavigate} from 'react-router-dom'
import {URL} from '../../URL'


//google sign
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

//mui
import { Typography , styled  ,Alert , Box} from '@mui/material';

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


const Login = ()=>{
    const navigate = useNavigate();

    
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    //alrt
    const [emailAlrt , setEmailAlrt] = useState(false)
    const [passwordAlrt , setPasswordAlrt] = useState(false)
    const [chackUser , setChackUser] = useState(false);

    //verify user
    const varifyUser = async(email, password)=>{
        try{
            let result = await fetch(`${URL}/login/${email}/${password}`)
            result = await result.json();
        
        if(Object.keys(result).length !== 0){
            localStorage.setItem('userData' , JSON.stringify(result[0]));
            setChackUser(false);
            navigate('/Home')
        }else{
            setChackUser(true);
        }
       }catch(error){
        console.log(error);
       }
    }


     //google with signUp
   const onLoginSucces = (res)=>{
    const decode = jwt_decode(res.credential);

    console.log(decode)

    let email = decode.email;
    let password = decode.sub;

    let newPassword = "";
    for(let i=0;i<password.length;i++){
        newPassword += String.fromCharCode((password.charCodeAt(i) + 5));
     }

    varifyUser(email , newPassword);
   }
   const onLoginError = ()=>{}

    //handle login function
    let clickCount = 0;
    const handleLogin = async()=>{
        
         //email validation
         if(email.length === 0){
            setEmailAlrt(true);
            setChackUser(false);
        }else{
            setEmailAlrt(false)
        }

      //password validation
      if(password.length === 0){
          setPasswordAlrt(true);
          setChackUser(false);
      }else{
          setPasswordAlrt(false);
      }

        //get user
        if( email.length !== 0 && password.length !== 0){
                if(clickCount > 0){
                    //password change
                    let newPassword = "";
                    for(let i=0;i<password.length;i++){
                        newPassword += String.fromCharCode((password.charCodeAt(i) + 5));
                     }

                     //call api
                    varifyUser(email , newPassword);
                   clickCount = 0;
                }
                clickCount++;
            }
        }       

    return (
        <>
            <div className="container" style={{background : '#f2f2f2'}}>
            <div className="wrapper" style={{ background : '#FFFF'}}>
                <div className="title"><span>Login Form</span></div>
                <form>
                {
                    chackUser && <Alert  severity="error" style={{marginBottom:'5px'}}>can't available user</Alert>
                }
                <div className="row">
                    <i className="fas fa-user"></i>
                    <input type="text" value={email} placeholder="Email " onChange={(e)=>{setEmail(e.target.value)}} required/>
                </div>
                {
                    emailAlrt && <AlrtBox>* enter email</AlrtBox>
                }
                <div className="row">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                {
                    passwordAlrt && <AlrtBox>* enter password</AlrtBox>
                }
                
               
                <div className="pass"><Link to={'/Forget_password'}>Forgot password?</Link></div>
                <div className="row button">
                    <input type="button" value="Login" onClick={handleLogin}/>
                </div>

                <Box style={{justifyContent:'center' , paddingLeft:'10%'}}>
                       <GoogleLogin 
                            onSuccess={onLoginSucces}
                              onError={onLoginError}
                              
                       />
                </Box>

                <div className="signup-link" style={{ color : 'black' }}>Not a member? <Link to={'/SignUp'}>Signup now</Link></div>
                </form>
            </div>
            </div>
        </>
    )
}

export default Login