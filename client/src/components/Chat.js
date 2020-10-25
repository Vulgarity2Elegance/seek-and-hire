import React from 'react'
import { InputItem, List, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, receiveMsg} from '../redux/message.redux'

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {text: '', msg: []}
  }
  componentDidMount() {
    this.props.getMsgList()
    this.props.receiveMsg()
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }
  render() {
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          {this.props.match.params.user}
        </NavBar>

        {this.props.message.chatMsg.map(v => {
          return v.from === user 
          ? (
            <List key={v.id}>
              <Item> {v.content} </Item>
            </List>
          )
          : (
            <List key={v.id}>
              <Item className='chat-me'> {v.content} </Item>
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