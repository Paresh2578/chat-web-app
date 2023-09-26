import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

//css
import './Authentication.css'

//URL
import { URL } from '../../util/URL';

//contom function
import { SweetAlrt } from '../../util/SweetAlrt';

//componets
import Loder from '../loder/Loder'

export default function Authentication() {
  const navigate = useNavigate();
  const [loder , setLoder] = useState(false);

    const on_success = (res)=>{
       setLoder(true);
        let data = jwt_decode(res.credential);

        data = {
          username : data.name,
          email : data.email,
          password : data.sub,
          profile : data.picture,
        }

        check_allredy_login(data);
    }

    const on_error = (res)=>{
      SweetAlrt("log in" , "error");
        console.log(res);
    }

    const check_allredy_login = async(data)=>{
      try{
           let result = await fetch(`${URL}/user/find/${data.email}/${data.password}`);
           result = await result.json();

           if(result.length == 0){
             sign_up_user(data);
           }else{
             login_user(result);
           }
         
      }catch(error){
        SweetAlrt("log in" , "error");
       console.log('check allredy user api error : ' + error);
      }
 }

    const sign_up_user = async(data) =>{
       data = {...data , about : "available"};
       try{
         let result = await fetch(`${URL}/user/register` , {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
              'content-type' : 'application/json'
            }
         })
          data = [data];
          localStorage.setItem('auth' , JSON.stringify(data));
          SweetAlrt("Sign in" , "success")
          setLoder(false);
          navigate('/');
       }catch(error){
        SweetAlrt("Signin " , "error")
        console.log('register user api error : ' + error);
       }
    }

    const login_user = (result) =>{
       localStorage.setItem('auth' , JSON.stringify(result));
       SweetAlrt("Log in" , "success");
       setLoder(false);
       navigate('/');
    }

   

  return (
    <div className='Authentication_body'>
      {loder && <Loder/>}

       {!loder &&  <div className="login-form">
        <GoogleLogin
            onSuccess={(res)=>on_success(res)}
            onError={(res) =>on_error(res)}
          />  
        </div>}
    </div>
  )
}
