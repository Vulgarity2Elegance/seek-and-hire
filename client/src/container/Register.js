import React from 'react'
import Logo from '../components/Logo/Logo'
import { Button, InputItem, List, Radio, WhiteSpace, WingBlank } from 'antd-mobile'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      valid:'',
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
            <InputItem onChange={v => this.handleChange('user', v)}>Username</InputItem>
            <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>Password</InputItem>
            <InputItem type='password' onChange={v => this.handleChange('valid', v)}>Confirm</InputItem>
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

export default Register