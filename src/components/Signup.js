import React,{useState} from 'react'
import "../css/signup.css"
import { useForm } from 'react-hook-form'
import {  useNavigate ,Navigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup
  .object()
  .shape({
    name: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: yup.string().required().email(),
    password:yup.string().required().min(8).max(14).matches(/^[aA-zZ0-9\s]+$/, "only letters and numbers are allowed "),
    passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
  }).required();

const Signup = () => {
   
    // const {register,handleSubmit,errors} = useForm(
    // { resolver: yupResolver(schema)}
    // );
    const [backendErrors , setBackendErrors] = useState([]);
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm( { resolver: yupResolver(schema)});


    const onSubmit = (data) => { 
       
        // console.log(data,"data")
        const url = 'http://localhost/hosmdb/insertUser.php'
        axios.post(url,data).then((res)=>{
            if(res.data == "yes"){
            navigate("/signin", { replace: true });
            }
            else if(res.data=="registered") {
                setBackendErrors([...backendErrors , "Your Email is already registered"]);
            }
            else {
                alert("something went wrong");
            }
            // <Navigate to="/signin" replace={true} />
       
            console.log(res,"res")
        }).catch((err)=>{
            console.log(err);
        })
    
    };


    const content = {
        inputs:[
        {
            label:"First name",
            name:"name",
            type:"text",
            placeholder:"Hossam"
        },
        {
            label:"Email",
            name:"email",
            type:"text",
            placeholder: "example@gmail.com"
        },
        {
            label:"Password",
            name:"password",
            type:"password",
            placeholder:"password"
        },
        {
            label:"Confirm password",
            name: "passwordConfirmation",
            type:"password",
            placeholder:"password"
        }
        
    ]
    }
    
  return (
    <div className="container-css flex-column">
    {/* <a className="navbar-brand my-3" href="index.php" style = {{fontFamily:"cursive",color:"white"}}>La Galérie</a> */}
        <form onSubmit={handleSubmit(onSubmit)} className="form" id="form" >
            <div className="header-signin">
                <h2>Create Account</h2>
            </div>
     <div className="padding">
    {backendErrors.length==0?null : backendErrors.map((e,i)=>{
        return(
            <div className="alert alert-danger" role="alert" key={i}>
                {e}
</div>
        )
    })}
    {content.inputs.map((input,i)=>{
        return(
            <div className="form-control-css star " key={i}>
            <label htmlFor={input.label}> {input.label}</label>
            <input  type={input.type} placeholder={input.placeholder} id={input.name} name={input.name} 
            { ...register(input.name)} />
            <i className="fas fa-check-circle"></i>
            <i className="fas fa-exclamation-circle"></i>
            <small id={input.name+"-msg"}>{errors[input.name]?.message}</small>
           </div>
        )
    })}
     {/* <div className="form-control-css ">
      <label htmlFor="userName"> Name</label>
      <input type="text" placeholder="Enter your Name" id="userName" name="username" />
      <i className="fas fa-check-circle"></i>
      <i className="fas fa-exclamation-circle"></i>
      <small>error msg</small>
     </div> */}
 
     {/* <div className="form-control-css  ">
         <label htmlFor="email"> Email</label>
         <input type="text" placeholder="Enter your email" id="email" name="email" /> 
         <i className="fas fa-check-circle"></i>
         <i className="fas fa-exclamation-circle"></i>
         <small id="email-msg">error msg</small>
        </div> */}
 
        {/* <div className="form-control-css ">
         <label htmlFor="password">Password</label>
         <input type="password" placeholder="Enter your password" id="password" name="password" /> 
         <i className="fas fa-check-circle"></i>
         <i className="fas fa-exclamation-circle"></i>
         <small>error msg</small>
        </div> */}
 
        {/* <div className="form-control-css ">
         <label htmlFor="confrim-password">Confirm Password</label>
         <input type="password" placeholder="Confirm your password" id="confirm-password" name="cpassword"/>
         <i className="fas fa-check-circle"></i>
         <i className="fas fa-exclamation-circle"></i>
         <small id="password-msg">error msg</small>
        </div> */}
 
   
        <div>
            <button className='btn mt-5 mb-3' id="submit" name="submit" type="submit">Create</button>
 
        </div>
        </div>
     </form>
 </div>
  )
}

export default Signup