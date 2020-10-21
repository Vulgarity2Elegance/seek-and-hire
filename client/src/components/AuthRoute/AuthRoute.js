import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // get users' info including current url address, users' type, information completion 
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('/login')
          }
        }
      })
  }
  render() {
    return null
  }
}

const mapStatetoProps = (state) => state.user
const actionCreators = {loadData}
AuthRoute = connect(mapStatetoProps, actionCreators) (AuthRoute)

export default withRouter(AuthRoute)