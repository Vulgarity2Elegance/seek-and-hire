import React from 'react'
import Logo from '../components/Logo/Logo'
import { Button, InputItem, List, Radio, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../redux/user.redux'
import '../index.css'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      verification:'',
      type: 'seeker'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleRegister() {
    this.props.register(this.state)
    console.log(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo />
        <h1>Register</h1>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='err-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.handleChange('username', v)}>Username</InputItem>
            <InputItem type='password' onChange={v => this.handleChange('password', v)}>Password</InputItem>
            <InputItem type='password' onChange={v => this.handleChange('verification', v)}>Confirm</InputItem>
            <RadioItem checked={this.state.type === 'seeker'} onChange={() => this.handleChange('type', 'seeker')}>Job Seeker</RadioItem>
            <RadioItem checked={this.state.type === 'hirer'} onChange={() => this.handleChange('type', 'hirer')}>Job Hirer</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    msg: state.user.msg
  }
}
const actionCreators = {register}
Register = connect(mapStatetoProps, actionCreators) (Register)

export default Register