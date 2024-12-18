import axios from "axios";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Wrapper} from "../store/contextApi"

function Login() {
    const navigate = useNavigate();
    
    const emailRef=useRef('');
    const passRef=useRef('');
    const {setUser,User,isAuthenticated,SetAuthenticated}=useContext(Wrapper);
    console.log('l:',isAuthenticated)
    async function handler(e){
        e.preventDefault();
        console.log('submit')

        let formData={
            email:emailRef.current.value,
            password:passRef.current.value
        }

        try {
            const res=await axios.post('http://localhost:4200/api/v1/user/patient/login',formData,{withCredentials:true,headers:{"Content-Type":"application/json"}});
            console.log(res.data.user);
            setUser(res.data.user);
            SetAuthenticated(true);
            
            navigate('/');  
        } catch (error) {
            console.log(error);
        }
 
    }



  return (
    <>
      <div className="login">
      <main className="form-signin w-100 m-auto">
        <form  onSubmit={handler}>
          
          <h1 className="h3 mb-3 fw-normal pls-log">Please login</h1>

          <div className="form-floating">
            <input
              type="email"
              ref={emailRef}
              
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              ref={passRef}
              
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          
          <button className="btn btn-primary w-100 py-2" type="submit" >
            Sign in
          </button>
          <p className="mt-5 signUpOptX">New User? <span><Link to={'/registor'}>SignUp Here</Link></span></p>
        </form>
        </main>
      
      </div>
    </>
  );
}

export default Login;



