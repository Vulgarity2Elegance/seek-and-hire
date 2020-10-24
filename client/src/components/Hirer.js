import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../redux/chat.redux'
import UserCard from './UserCard'

class Hirer extends React.Component {
  componentDidMount() {
    this.props.getUserList('seeker')
  }
  render() {
    return <UserCard userList = {this.props.userList} />
  }
}

const mapStatetoProps = (state) => state.chat
const actionCreators = {getUserList}
Hirer = connect(mapStatetoProps, actionCreators) (Hirer)

export default Hirer