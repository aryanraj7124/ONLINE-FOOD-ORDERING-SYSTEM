import React from 'react'
import  {useState} from 'react'
import {useNavigate} from 'react-router-dom';
export default function Verify() {
    const [credentials, setCredentials] = useState({email: "", newPassword: "",otp:""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/confirmation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, newPassword: credentials.newPassword,otp: credentials.otp,})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
          navigate('/');
       }
       else{
          alert("please login with correct crendential");
       }
       
        }
    

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

 
  return (
    <>
     <div className='container mt-3'>
        <h2 >Log in</h2>
    <form  onSubmit={handleSubmit} className="my-5">
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"> New Password</label>
                    <input type="password" className="form-control" value={credentials.newPassword} onChange={onChange} name="newPassword" id="newPassword" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <div id="emailHelp" className="form-text">Put in the OTP that you received through email.</div>.
                    <input type="text" className="form-control"  value={credentials.otp} onChange={onChange} name="otp" id="otp" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
         </div> 

    </>
  )
}
