import React from 'react'
import Logo from '../components/Logo/Logo'
import { Button, InputItem, List, NoticeBar, Radio, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../redux/user.redux'
import Form from '../components/Form'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.props.handleChange('type', 'seeker')
  }
  handleRegister() {
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo />
        <WingBlank>
          <List> 
            {this.props.msg ? <NoticeBar mode="closable" icon={null}> {this.props.msg} </NoticeBar> : null}
            <InputItem onChange={v => this.props.handleChange('username', v)}>Username</InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('password', v)}>Password</InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('verification', v)}>Confirm</InputItem>
            <RadioItem checked={this.props.state.type === 'seeker'} onChange={() => this.props.handleChange('type', 'seeker')}>Job Seeker</RadioItem>
            <RadioItem checked={this.props.state.type === 'hirer'} onChange={() => this.props.handleChange('type', 'hirer')}>Job Hirer</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

Register = Form(Register)

const mapStatetoProps = (state) => state.user
const actionCreators = {register}
Register = connect(mapStatetoProps, actionCreators) (Register)

export default Register