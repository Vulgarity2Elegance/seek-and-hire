import axios from 'axios'
import { getRedirectPath } from '../utils/util'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERR_MSG = 'ERR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  username: '',
  type: ''
}

//reducer
export function user(state=initState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS: 
      return {...state, msg:'Logged in!', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case REGISTER_SUCCESS:
      return {...state, msg:'Registered!', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case ERR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

// action creator
function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload:data}
}
function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}
function errMsg(msg) {
  return {msg, type:ERR_MSG}
}

export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}

export function login({username, password}) {
  if (!username || !password) {
    return errMsg('Username & Password are required')
  }
  return dispatch=> {
    axios.post('/user/login', {username, password})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }
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
        dispatch(registerSuccess({username, type}))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }

}