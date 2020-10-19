import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from './Auth.redux'

class Auth extends React.Component {
  render() {
    return (
      <div>
        {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
        <h2>You need to login to proceed</h2>
        <button onClick={this.props.login}>Login</button>
      </div>
    )
  }
}
const mapStatetoProps = (state) => {
  return {isAuth: state.auth.isAuth}
}
const actionCreators = {login}
Auth = connect(mapStatetoProps, actionCreators) (Auth)

export default Auth
