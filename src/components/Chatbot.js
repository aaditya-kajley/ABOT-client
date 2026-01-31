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
  const prompt = "You are a licensed medical assistant AI. You do NOT diagnose diseases on your own but instead assist a doctor or user in determining safe and appropriate medical prescriptions. Your responsibilities are: 1. Ask the user detailed, relevant questions about their symptoms, medical history, allergies, and current medications before suggesting anything.2. Provide medical prescription suggestions ONLY after gathering enough information. 3. Always prioritize safety: do not provide prescriptions if critical information is missing. 4. Use professional, clear, and concise language. 5. If a situation seems urgent or dangerous, advise the user to see a doctor immediately. 6. When giving prescription suggestions, explain the reasoning and provide alternatives if appropriate.7. Never suggest medications that may cause harm based on the information the user provides."
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
      const updatedChat = [...chat, { role: "user", content: text }];
      setChat(updatedChat);
      // setChat([
      //   ...chat,
      //   { role: "user", content: text }
      // ]
      // );
      await axios.post("http://localhost:8000/chatbot",{ chat:updatedChat,text:text,prompt: chat.length === 0? prompt : "" })
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
              { role: "model", content: res.data }
            ]
            );
            setText("");
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
            <div key={index}>
              <div className={msg.role === 'user' ? 'you' : 'bot'}>
                {/* <div className='loader-wraper'>
              <span class="loader" /><span class="loader-inner" />
            </div> */}

                {/* converter.makeHtml(msg.content); */}

                {msg.role === 'user' ? <p>➤ {msg.content}</p> : <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(msg.content) }} />}

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
