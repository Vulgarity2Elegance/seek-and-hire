import React from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'

class Message extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    // Logged user
    const userid = this.props.user._id
    // getMsgList() 
    const userinfo = this.props.message.users
    // Group by Corrspodence filter by chatID
    const msgGroup = {}
    this.props.message.chatMsg.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    })

    // Get values of msgGroup 
    const chatList = Object.values(msgGroup)

    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userid ? v[0].to : v[0].from

          return (
            <List key={lastItem.create_time}>
              <List.Item 
                key={lastItem.create_time}
                thumb={require(`../components/AvatarSelector/img/${userinfo[targetId].avatar}.png`)}
              >
                {userinfo[targetId].name}
                <Brief> {lastItem.content} </Brief>
              </List.Item>
            </List>
          )
        })}
      </div>
    )
  }
}

const mapStatetoProps = (state) => state
// const actionCreators = {getMsgList, sendMsg, receiveMsg}
Message = connect(mapStatetoProps) (Message)

export default Message