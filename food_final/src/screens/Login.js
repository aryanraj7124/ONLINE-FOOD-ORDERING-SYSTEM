import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Login.css'
function Login() {
    const signup=()=>{
        localStorage.removeItem('token');
        navigate('/signup');
    }
    const [credentials, setCredentials] = useState({email: "", cpassword: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, cpassword: credentials.cpassword})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
        localStorage.setItem('userEmail', credentials.email); 
        localStorage.setItem('token', json.token); 
          navigate('/');
          alert("Successfully loged in");
       }
       else{
           navigate('/login')
          alert("please login with correct crendential");
       }
       
        }
    

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const [mode, setmode] = useState("light");

    const togglemode = () => {
      if (mode === "light") {
        setmode("dark");
        document.body.style.backgroundColor = "#042743";
        document.title = "Online Food Ordering System - Dark Mode";
      } else {
        setmode("light");
        document.body.style.backgroundColor = "white";
        document.title = "Online Food Ordering System - Light Mode";
      }
    };
 
   
  return (
      <>
        <Navbar
            title="Online Food Ordering System"
            mode={mode}
            togglemode={togglemode}
          />
    <div className='container mt-3'>
       
    <form  onSubmit={handleSubmit} className="my-5">
    <h2 >Log in</h2>
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required />
                <Link to="/reset" className='btn-danger'>Forgot Password</Link>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={signup} type="submit" className="btn btn-primary float-end">Sign Up</button>
            </form>
            
         </div> 
    </>
  )
}


export default Login
