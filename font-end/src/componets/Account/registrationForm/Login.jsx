import React , {useState} from 'react'
import './Login.css'
import {Link , useNavigate} from 'react-router-dom'
import {URL} from '../../URL'


//mui
import { Typography , styled  ,Alert} from '@mui/material';

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
                    //call api
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
                <div className="signup-link" style={{ color : 'black' }}>Not a member? <Link to={'/SignUp'}>Signup now</Link></div>
                </form>
            </div>
            </div>
        </>
    )
}

export default Login