import React from 'react'
import { connect } from 'react-redux'
import { Badge, List } from 'antd-mobile'
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
    console.log(chatList)
    
    chatList.sort((a, b) => {
      // sort chatList according to creat_time
      const a_last = this.getLast(a).create_time
      console.log(a_last)
      const b_last = this.getLast(b).create_time
      console.log(b_last)
      return a_last - b_last
    })

    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          // Show unread message on the msgList
          const unreadNum = v.filter(v => !v.read && v.to === userid).length

          return (
            <List key={lastItem.chatId}>
              <List.Item 
                extra={<Badge text={unreadNum}/>}
                thumb={require(`../components/AvatarSelector/img/${userinfo[targetId].avatar}.png`)}
                arrow='horizontal'
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
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