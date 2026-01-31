import userEvent from '@testing-library/user-event';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

// or via CommonJS


export default function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    async function LogIn(){
        history('/')
    }
    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/signup", { name, email, password })
                .then(res => {
                    if (res.data === "exist") {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User already exist",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                    else if (res.data === "notexist") {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Signed In",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        history("/home")

                    }
                }).catch(e => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Wrong Details",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    console.log(e)
                })
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <div >
             
                <div className="login">
                    <form action='POST'>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <h3>A'Bot</h3>
                        <input className="formInput"type="text" name="txt" placeholder="User name" required="" onChange={(e) => { setName(e.target.value) }} />
                        <input className="formInput"type="email" name="email" placeholder="Email" required="" onChange={(e) => { setEmail(e.target.value) }} />
                        <input className="formInput"type="password" name="pswd" placeholder="Password" required="" onChange={(e) => { setPassword(e.target.value) }} />
                        <br/>
                        <br/>
                        <br/>
                        <button onClick={submit}>Sign up</button>
                        <p>or</p>
                        <button onClick={LogIn}>LogIn</button>
                        <br/>
                    </form>
                </div>
            </div>
            {/* <div>
                <h3> Sign Up </h3>
                <form action='POST'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
                    </div>
                    <input type="submit" className="btn btn-primary" onClick={submit} />
                </form>
                <br />
                <p> OR </p>
                <br />
                <Link to="/"> Login Page </Link> 

    </div >*/}
        </>
    )
}
