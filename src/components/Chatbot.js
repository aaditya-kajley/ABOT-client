import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import './all.css'
import Swal from 'sweetalert2'

const showdown = require('showdown');
const converter = new showdown.Converter();

export default function Chatbot() {
  let data = ""
  const location = useLocation();
  const [text, setText] = useState('')
  const [state, setState] = useState(false)
  const ans = ""
  const history = useNavigate();
  const [chat, setChat] = useState([])

  async function submit(e) {
    e.preventDefault();
    Swal.fire({
      position: "top",
      icon: "",
      title: "Please wait few seconds",
      showConfirmButton: false,
      timer: 1500
    });
    console.log("hefj");
    data = data.concat(text);
    try {
      setChat([
        ...chat,
        { role: "user", content: text }
      ]
      );
      await axios.post("https://abot-server.onrender.com/chatbot", { text })
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
            var i = 0;
            setChat([
              ...chat,
              { role: "user", content: text },
              { role: "bot", content: res.data }
            ]
            );

            window.scrollTo(0, document.body.scrollHeight);
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
    <>
      <div className='top'>
        <div className='Chat'>
          {chat.map((msg, index) => (
            <div >
              <div className={msg.role === 'user' ? 'you' : 'bot'}>
                {/* <div className='loader-wraper'>
              <span class="loader" /><span class="loader-inner" />
            </div> */}
{console.log(converter.makeHtml(msg.content))}

 {/* converter.makeHtml(msg.content); */}
      
                {msg.role === 'user' ? <p>➤ {msg.content}</p> : <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.content) }} /> }

              </div>

            </div>
          ))}



        </div>


        <div id="div2">
          <form onSubmit={submit}>
            <input type="text" placeholder='Type here' onChange={(e) => { setText(e.target.value) }} />
          </form>
        </div>
      </div>
    </>
  )
}
