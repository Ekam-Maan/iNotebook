import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Singup = () => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({name: "", email: "", password: ""})
    const host = "http://localhost:5000"

    const onValueChange = (e) =>{
        setRegisterData({...registerData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        //cjecking if the  re enter password is same.
        if(document.getElementById("password").value !== document.getElementById("cpassword").value){
            alert("passwords did not match. please enter again");
            document.getElementById("password").value = "";
            document.getElementById("cpassword").value = "";
            document.getElementById("password").focus();
            return false;
        }
        // api call to register user in the database
        const url = host + "/api/auth/createUser";
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"name": registerData.name, "email": registerData.email, "password": registerData.password}), // body data type must match "Content-Type" header

        });

          const res = await response.json();
          if(res.success){
            localStorage.setItem('auth', res.authToken);
            navigate('/');
          }else{
            alert(res.error);
          }
          console.log(res);

    }

  return (
    <div className='container my-5'>
        <h5>Thank you for choosing iNotebook - The prefect place to keep your notes safe and secure.</h5>
      <form className='my-5' onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' id="name" onChange={onValueChange} required />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="email" aria-describedby="email" onChange={onValueChange} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="password" minLength={5} onChange={onValueChange} required />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">confirm Password</label>
            <input type="password" className="form-control" name='cpassword' id="cpassword" minLength={5} onChange={onValueChange} required />
        </div>
       
        <button type="submit" className="btn btn-primary">Register</button>
     </form>
    </div>
  )
}

export default Singup;