
// import React, {useState} from 'react'
// import {Link} from "react-router-dom"
// import {useNavigate} from 'react-router-dom';
// import Navbar from '../components/Navbar';
// const Signup = () => {
//     const [credentials, setCredentials] = useState({name:"",email: "", cpassword: "",confirmPassword:""}) 
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         const {name,email,cpassword,confirmPassword} = credentials;
//         e.preventDefault();
//         const response = await fetch("http://localhost:5000/userpost", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({name,email, cpassword,confirmPassword})
//         });
//         const json = await response.json()
//         console.log(json);
//         if (json.success){
//             localStorage.setItem('userEmail', credentials.email); 
//             localStorage.setItem('token', json.token); 
//            navigate('/');
//         }
//         else{
//            alert("User With This email Already exits")
//            navigate('/login');
//         }
        
//     }

//     const onChange = (e)=>{
//         setCredentials({...credentials, [e.target.name]: e.target.value})
//     }
//     const [mode, setmode] = useState("light");

//     const togglemode = () => {
//       if (mode === "light") {
//         setmode("dark");
//         document.body.style.backgroundColor = "#042743";
//         document.title = "Online Food Ordering System - Dark Mode";
//       } else {
//         setmode("light");
//         document.body.style.backgroundColor = "white";
//         document.title = "Online Food Ordering System - Light Mode";
//       }
//     };
//     return (
//         <>
//           <Navbar
//             title="Online Food Ordering System"
//             mode={mode}
//             togglemode={togglemode}
//           />
//         <div className='container'>
//         <form onSubmit={handleSubmit} className="my-1" >
//         <div className="mb-3" >
//                     <label htmlFor="name" className="form-label">Name</label>
//                     <input onChange={onChange} type="test" className="form-control"  id="name" name="name" aria-describedby="emailHelp" />
//                 </div>
//                 <div className="mb-3" >
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input onChange={onChange} type="email" className="form-control"  id="email" name="email" aria-describedby="emailHelp" />
//                     <div  id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div className="mb-3" >
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input onChange={onChange} type="password" className="form-control"  name="cpassword" id="cpassword" required/>
//                 </div>
//                 <div className="mb-3" >
//                     <label htmlFor="cpassword" className="form-label">Confirm Password</label>
//                     <input onChange={onChange} type="password" className="form-control"  name="confirmPassword" id="confirmPassword" required />
//                 </div>

//                 <button type="submit" className="btn btn-primary">Submit</button>
//                 <Link to="/login" className="m-3 btn btn-danger" >Already A User</Link>
//             </form>
//         </div>
//          </>
//     )
// }

// export default Signup

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    cpassword: '',
    confirmPassword: '',
    phoneNumber: '', // Add phoneNumber field
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { name, email, cpassword, confirmPassword, phoneNumber } = credentials;
    e.preventDefault();

    // Check if the phoneNumber contains exactly 10 digits
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Phone number must be a 10-digit number');
      return;
    }

    const response = await fetch('http://localhost:5000/userpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, cpassword, confirmPassword, phoneNumber }), // Include phoneNumber in the request body
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.token);
      navigate('/');
    } else {
      alert('User With This email Already exits');
      navigate('/login');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [mode, setmode] = useState('light');

  const togglemode = () => {
    if (mode === 'light') {
      setmode('dark');
      document.body.style.backgroundColor = '#042743';
      document.title = 'Online Food Ordering System - Dark Mode';
    } else {
      setmode('light');
      document.body.style.backgroundColor = 'white';
      document.title = 'Online Food Ordering System - Light Mode';
    }
  };
  return (
    <>
      <Navbar title="Online Food Ordering System" mode={mode} togglemode={togglemode} />
      <div className="container">
        <form onSubmit={handleSubmit} className="my-1">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input onChange={onChange} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input onChange={onChange} type="password" className="form-control" name="cpassword" id="cpassword" required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input onChange={onChange} type="password" className="form-control" name="confirmPassword" id="confirmPassword" required />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              name="phoneNumber"
              id="phoneNumber"
              maxLength="10"
              minLength="10"
              pattern="\d{10}"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already A User
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
