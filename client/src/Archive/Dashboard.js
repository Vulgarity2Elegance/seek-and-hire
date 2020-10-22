import React from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import { logout } from "./Auth.redux"

class Dashboard extends React.Component {
  render() {
    const redirectToLogin = <Redirect to='/login' />
    const app = (
      <div>
        <ul>
          <li>
            <Link to='/dashboard/'>Counter</Link>
          </li>
          <li>
            <Link to='/dashboard/2'>c2</Link>
          </li>
          <li>
            <Link to='/dashboard/3'>c3</Link>
          </li>
        </ul>
        <Route path='/dashboard' exact component={App} />
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}

const mapStatetoProps = (state) => {
  return {isAuth: state.auth.isAuth}
}
const actionCreators = {logout}
Dashboard = connect(mapStatetoProps, actionCreators) (Dashboard)

export default Dashboard