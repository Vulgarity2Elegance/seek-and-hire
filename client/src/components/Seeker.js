import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../redux/chat.redux'
import UserCard from './UserCard'

class Seeker extends React.Component {
  componentDidMount() {
    this.props.getUserList('hirer')
  }
  render() {
    return <UserCard userList = {this.props.userList} />
  }
}

const mapStatetoProps = (state) => state.chat
const actionCreators = {getUserList}
Seeker = connect(mapStatetoProps, actionCreators) (Seeker)

export default Seeker