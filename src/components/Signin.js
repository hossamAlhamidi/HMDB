import React , {useState,useEffect} from 'react'
import '../css/signup.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as config from './config/apiConfig'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {useSelector , useDispatch} from 'react-redux';

const schema = yup
  .object()
  .shape({
    email: yup.string().required().email(),
    password:yup.string().required()
  }).required();

const Signin = () => {
    const auth = useSelector((state)=>{
        return({auth:state.auth,email:state.email})
      })

    const [userValid , setUserValid] = useState("");
    const [name , setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
    
      
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm( { resolver: yupResolver(schema)});

      const onSubmit = (data) => {
        const url = `${config.url}/getUser.php`
        console.log(data,"data");

        axios.post(url,data).then((res)=>{
            console.log(res.data,"data")
            if(res.data=="no"){
                setUserValid("Sorry, we could not find your account")
            }

            else {
            //   window.localStorage.setItem("email",res.data.email);
            //   window.localStorage.setItem("name",res.data.name);
                 window.localStorage.setItem("auth",true);
                 window.localStorage.setItem("email",res.data.email);
              dispatch({type:"LOGIN",payload:res.data.email});
              navigate("/")
              // window.location.reload()
            // setName(res.data.name);
           
            }

        }).catch((err)=>{
            console.log(err);
        })
    }

  
  return (
    <div className="container-css flex-column">
    {/* <a className="navbar-brand my-3" href="index.php" style = {{fontFamily:"cursive",color:"white"}}>La Galérie</a> */}
        <form onSubmit={handleSubmit(onSubmit)} className="form" id="form"  method="POST"> 
            <div className="header-signin">
                <h2>Sign in</h2>
            </div>

     <div className="padding">
        {userValid==""?null: <div className="alert alert-danger" role="alert">
                {userValid}
</div>}
     <div className="form-control-css ">
       <label htmlFor="email">Email</label> 
      <input  { ...register("email")} type="text" placeholder="Enter your email" id="email" name="email"/>
      <i className="fas fa-check-circle"></i>
      <i className="fas fa-exclamation-circle"></i>
      <small>{errors["email"]?.message}</small>
     </div>
 
     
 
        <div className="form-control-css ">
          <label htmlFor="password">Password</label> 
         <input  { ...register("password")}type="password" placeholder="Enter your password" id="password" name="password"/>
         <i className="fas fa-check-circle"></i>
         <i className="fas fa-exclamation-circle"></i>
         <small>{errors["password"]?.message}</small>
        </div>
        {/* <div className="forgot  ">
            <a href="#"> Forgot Password? </a>
         </div> */}
 
         <div className="signup  ">
             <span> don't have an account?</span> <Link  to="/signup" >sign up</Link>
          </div>
 
 
        <div>
            <button id="submit" type="submit" name="submit">Sign in</button>
 
        </div>
        </div>
     </form>
 </div>
  )
}

export default Signin