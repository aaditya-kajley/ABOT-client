import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './all.css'
import Swal from 'sweetalert2'

// or via CommonJS
export default function Imagegeneration() {
    const history = useNavigate();
    const [prompt, setPrompt] = useState('')
    const [link, setLink] = useState('')
    async function submit(e) {
        console.log("hefj");
        e.preventDefault();
        try {
          await axios.post("https://abot-server.onrender.com/imagegeneration", { prompt })
            .then(res => {
              if (res.data === "LogIn") {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Please log in first",
                  showConfirmButton: false,
                  timer: 1500
                });
                history("/");
              }
              else {
                document.querySelector('#image').src = res.data;
              }
            }).catch(e => {
              console.log(e)
            })
        }
        catch (e) {
          console.log(e);
        }
      }
  return (
    <div className='top'>
        <img src="" alt="" id="image" />
      <div className="div2">
        <form onSubmit={submit}>
          <input type="text" placeholder ="Enter Text"onChange={(e) => { setPrompt(e.target.value) }} />
          </form>
        </div>
    </div>
  )
}
