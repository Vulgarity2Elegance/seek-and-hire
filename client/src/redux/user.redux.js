import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERR_MSG = 'ERR_MSG'
const initState = {
  isAuth: false,
  msg: '',
  username: '',
  password: '',
  type: ''
}

//reducer
export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg:'Registered!', isAuth: true, ...action.payload}
    case ERR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

// action creator
function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}
function errMsg(msg) {
  return {msg, type:ERR_MSG}
}

export function register({username, password, verification, type}) {
  if (!username || !password || !type) {
    return errMsg('Username & Password are required')
  }
  if (password !== verification) {
    return errMsg('Passwords are not the same')
  }
  return dispatch=> {
    axios.post('/user/register', {username, password, type})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess(username, type))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }

}