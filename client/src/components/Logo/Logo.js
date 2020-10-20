import React from 'react'
import logoImg from "./Logo.png"
import "./logo.css"

class Logo extends React.Component {
  render() {
    return (
      <div className='logo-container'>
        <img className='logo' src={logoImg} alt=""/>
      </div>
    )
  }
}

export default Logo