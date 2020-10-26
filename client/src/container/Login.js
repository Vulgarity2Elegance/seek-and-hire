import React from 'react'
import Logo from "../components/Logo/Logo"
import {List, InputItem, WhiteSpace, Button, WingBlank, NoticeBar} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../redux/user.redux'
import Form from '../components/Form'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin() {
    this.props.login(this.props.state)
  }
  register() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank>
          <List>
          {this.props.msg ? <NoticeBar mode="closable" icon={null}> {this.props.msg} </NoticeBar> : null}
            <InputItem onChange={v => this.props.handleChange('username', v)}>Username</InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('password', v)}>Password</InputItem>
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

Login = Form(Login)

const mapStatetoProps = (state) => state.user
const actionCreators = {login}
Login = connect(mapStatetoProps, actionCreators) (Login)

export default Login