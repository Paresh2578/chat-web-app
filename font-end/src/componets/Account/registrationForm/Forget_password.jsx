import React , {useState} from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom'
import { URL } from '../../URL';


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


const  Forget_password = ()=>{
    const navigate = useNavigate();

     const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    //alrt
    const [emailAlrt , setEmailAlrt] = useState(false)
    const [passwordAlrt , setPasswordAlrt] = useState(false)
    const [chackUser , setChackUser] = useState(false);
    
    //handleForget_password 
    let clickCount = 0;
   const handleForget_password = async()=>{
            
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
                
            }else{
                setPasswordAlrt(false);
            }

              //password validation
                let passwordPatten = "^[A-Za-z0-9!@#$%^&*]{8,15}$"
                let RPassword = new RegExp(passwordPatten);


                if(RPassword.test(password)){
                    setChackUser(false);
                    setPasswordAlrt(false)
                }else{
                    setPasswordAlrt(true);
                }



            //get user
        if( email.length !== 0 && password.length !== 0){
            if(clickCount > 0){

                //user email chack
                try{
                    // let UserFind_result = await fetch(`${URL}/userFind/${email}`);
                    let UserFind_result = await fetch(`${URL}/userFind/${email}`);
                    UserFind_result = await UserFind_result.json();
                    if(Object.keys(UserFind_result).length > 0){

                        //password change
                        let newPassword = "";
                        for(let i=0;i<password.length;i++){
                            console.log("entri is password");
                             newPassword += String.fromCharCode((password.charCodeAt(i) + 5));
                        }

                        console.log("old password : " + password + "newpassword : " + newPassword);

                        setPassword(newPassword);
                       console.log("change password ser : " + password);
                        //password update
                        let passWordUpdate_result = await fetch(`${URL}/forgerPassword/${email}`,{
                            method : "put",
                            body : JSON.stringify({newPassword}),
                            headers : {
                                "Content-Type": "application/json"
                            }
                        })
                        
                        setChackUser(false);
                        navigate('/Login')
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
            <div className="wrapper" style={{ background :  '#FFFF'}}>
                <div className="title"><span>Foreget password </span></div>
                <form>
                {
                    chackUser && <Alert  severity="error" style={{marginBottom:'5px'}}>Worng email id</Alert>
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
                    <input type="password" placeholder="new Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                {
                    passwordAlrt && <AlrtBox>* password  length greter than 8 to 15</AlrtBox>
                }
                <div className="row button">
                    <input type="button" value="update" onClick={handleForget_password}/>
                </div>
                </form>
            </div>
            </div>
        </>
    )
}
export default Forget_password;