import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  users: {},
  unread: 0
}

// Reducer
export function message(state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state, 
        users: action.payload.users,
        chatMsg: action.payload.msgs, 
        unread: action.payload.msgs.filter(v => !v.read).length
      }
    case MSG_RECV:
      return {
        ...state, 
        chatMsg: [...state.chatMsg, action.payload],
        unread: state.unread+1
      }
    // case MSG_READ:
    //   return
    default: 
      return state
  }
}

// Action Creators
function msgList(msgs, users) {
  return {type: MSG_LIST, payload: {msgs, users}}
}

function msgRecv(msg) {
  return {type: MSG_RECV, payload: msg}
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msgs, res.data.users))
        }
      })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg})
  }
}

export function receiveMsg() {
  return dispatch => {
    socket.on('receiveMsg', data => {
      dispatch(msgRecv(data))
    })
  }
}