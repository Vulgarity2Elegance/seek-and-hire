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
        unread: action.payload.msgs.filter(
          // Messages must be sent to the logged user 
          v => !v.read && v.to === action.payload.userid
        ).length
      }
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0
      return {
        ...state, 
        chatMsg: [...state.chatMsg, action.payload],
        unread: state.unread+n
      }
    case MSG_READ:
      const {from, num} = action.payload
      return {
        ...state,
        chatMsg: state.chatMsg.map(v => ({...v, read: from === v.from ? true : v.read})),
        unread: state.unread - num
      }
     default: 
      return state
  }
}

// Action Creators
function msgList(msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}}
}

function msgRecv(msg, userid) {
  return {userid, type: MSG_RECV, payload: msg}
}

function msgRead({userid, from, num}) {
  return {type: MSG_READ, payload: {userid, from, num}}
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          // logged user's id
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
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
  return (dispatch, getState) => {
    socket.on('receiveMsg', data => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
      .then(res => {
        const userid = getState().user._id
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgRead({userid, from, num: res.data.num}))
        }
      })
  }
}