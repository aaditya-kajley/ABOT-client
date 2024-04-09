import React from 'react'
import axios from 'axios'
import './all.css';
export default function header() {
    async function logout() {
        await axios.post("https://abot-server.onrender.com/logout")
            .then(res => {
                console.log(res)
                if (res.data === "nouser")
                    alert("No User Logged In")
                else {
                    alert("User Logged Out")
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='header'>
            <ul >
                <li className="item">
                    <a className="nav-link" >ABOT </a>
                </li>
                <li className="item">
                    <a className="nav-link" href="/">ChatBot </a>
                </li>
                <li className="item">
                    <a className="nav-link" href="/imagegeneration">Image Generation </a>
                </li>
                <li className="item">
                    <a className="nav-link" href="/login">Login </a>
                </li>
                <li className="item">
                    <a className="nav-link" href="/signup">SignUp</a>
                </li>
                <li className="item">
                    <a className="nav-link" onClick={logout}>LogOut</a>
                </li>

            </ul>
        </div >
    )
}
