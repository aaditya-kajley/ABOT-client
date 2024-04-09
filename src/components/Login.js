import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2'

// or via CommonJS

export default function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function signup(){
        history("/signup")
    }
    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("https://abot-server.onrender.com/login", { email, password })
                .then(res => {
                    if (res.data === "exist") {
                        Swal.fire({
                            position: "top-end",
                            icon: "",
                            title: "Logged In",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        history("/home", { state: { id: email } })
                    }
                    else if (res.data === "notexist") {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "No user found",
                            showConfirmButton: false,
                            timer: 1500
                          });
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
                <div className='login'>
                    <form action='POST'>
                        <label htmlFor="chk" aria-hidden="true">ABOT</label>
                        <h3>A'Bot</h3>
                        <input className="formInput" type="email" name="email" placeholder="Email" required=""  onChange={(e) => { setEmail(e.target.value) }}/>
                        <input className="formInput" type="password" name="pswd" placeholder="Password" required="" onChange={(e) => { setPassword(e.target.value) }} />
                        <div>
                            <br/>
                        <button onClick={submit}>Login</button>
                        <p>or</p>
                        <button onClick={signup}>SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
