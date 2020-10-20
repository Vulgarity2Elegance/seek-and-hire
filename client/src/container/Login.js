import React from 'react'
import Logo from "../components/Logo/Logo"
import {List, InputItem, WhiteSpace, Button, WingBlank} from 'antd-mobile'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }
  register(){
    console.log(this.props)
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        <Logo/>
        <h1>Login</h1>
        <WingBlank>
          <List>
            <InputItem>User</InputItem>
            <InputItem>Password</InputItem>
          </List>
          <WhiteSpace/>
          <Button type='primary'>Login</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login