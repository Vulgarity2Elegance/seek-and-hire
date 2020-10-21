import React from 'react'
import Logo from "../components/Logo/Logo"
import {List, InputItem, WhiteSpace, Button, WingBlank} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../redux/user.redux'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleLogin() {
    this.props.login(this.state)
  }
  register(){
    console.log(this.props)
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='err-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.handleChange('username', v)}>Username</InputItem>
            <InputItem type='password' onChange={v => this.handleChange('password', v)}>Password</InputItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handleLogin} type='primary'>Login</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStatetoProps = (state) => state.user
const actionCreators = {login}
Login = connect(mapStatetoProps, actionCreators) (Login)

export default Login