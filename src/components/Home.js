import React from 'react'
import Chatbot from './assets/chatbot.jpeg'
import ImageGeneration from './assets/imgeneration.png'
export default function Home() {
    return (
        <div className='home'>
            <a href='/chatbot'>
                <div className='homesub'>
                    <img src={Chatbot} alt="Chatbot" width="100%" /> <br />
                    <h3>ChatBot</h3>
                </div>
            </a>
            <a href='/imagegeneration'>
                <div className='homesub'>
                    <img src={ImageGeneration} alt="ImageGeneration" width="100%" /> <br />
                    <h3>Image Generation</h3>
                </div>
            </a>
        </div>
    )
}
