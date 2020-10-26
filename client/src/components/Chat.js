import React from 'react'
import { Icon, InputItem, List, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, receiveMsg} from '../redux/message.redux'
import { getChatId } from '../utils/util'

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {text: '', msg: []}
  }
  componentDidMount() {
    if (!this.props.message.chatMsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }
  render() {
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.message.users
    if (!users[userid]) {
      return null
    }
    // Only show messages to users who have correspondence with each other.
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.message.chatMsg.filter(v => v.chatId === chatid)

    return (
      <div id='chat-page'>
        <NavBar 
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={() => {this.props.history.goBack()}}
        >
          {users[userid].name}
        </NavBar>

        {chatmsgs.map(v => {
          const avatar = require(`../components/AvatarSelector/img/${users[v.from].avatar}.png`)

          return v.from === userid 
          ? (
            <List key={v._id}>
              <Item
                key={v._id}
                thumb={avatar}
              > 
                {v.content} 
              </Item>
            </List>
          )
          : (
            <List key={v._id}>
              <Item 
                key={v._id}
                extra={<img src={avatar} alt='avatar'/>}
                className='chat-me'
              > 
                {v.content} 
              </Item>
          </List>
          )
        })}

        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='type...'
              value={this.state.text}
              onChange={v => {this.setState({text:v})}}
              extra={<span type='primary' onClick={() => this.handleSubmit()} >Send</span>}
            />
          </List>

        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => state
const actionCreators = {getMsgList, sendMsg, receiveMsg}
Chat = connect(mapStatetoProps, actionCreators) (Chat)

export default Chat