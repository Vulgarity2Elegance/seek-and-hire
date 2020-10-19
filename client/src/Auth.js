import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login, getUserData } from './Auth.redux'

class Auth extends React.Component {
  componentDidMount() {
    this.props.getUserData()
  }
  render() {
    return (
      <div>
        <h2>My name is {this.props.user}, and my age is {this.props.age}</h2>
        {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
        <h2>You need to login to proceed</h2>
        <button onClick={this.props.login}>Login</button>
      </div>
    )
  }
}
const mapStatetoProps = (state) => {
  return {
    isAuth: state.auth.isAuth, user: state.auth.user, age: state.auth.age
  }
}
const actionCreators = {login, getUserData}
Auth = connect(mapStatetoProps, actionCreators) (Auth)

export default Auth
