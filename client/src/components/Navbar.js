import React from 'react'
import symbol from '../assets/symbol.png'
import alert from '../assets/alert.svg'
import assistant from '../assets/assistant.svg'
import pro from '../assets/pro.svg'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className='navbar'>
        <div className='navbar-wrapper'>
            <div className='symbol-container'>
                <img src={symbol} />
                <p>Welcome Back, {user.fullname}!</p>
            </div>

            <div className='navbar-right'>
                <div className='alerts'>
                    <img src={alert}/>
                    <p>Alerts</p>
                </div>

                <div className='assistant'>
                    <img src={assistant}/>
                    <p>Audio Processing Assistant</p>
                </div>

                <div className='talk-pro'>
                    <img src={pro}/>
                    <p>Talk to a Pro</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Navbar