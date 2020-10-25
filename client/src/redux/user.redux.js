import axios from 'axios'
import { getRedirectPath } from '../utils/util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERR_MSG = 'ERR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  msg: '',
  username: '',
  type: ''
}

//reducer
export function user(state=initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS: 
      return {...state, msg:'', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case ERR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case LOGOUT:
      return {...initState, redirectTo:'/login'}
    default:
      return state
  }
}

// action creator
function authSuccess(data) {
  return {type: AUTH_SUCCESS, payload:data}
}
function errMsg(msg) {
  return {msg, type:ERR_MSG}
}

export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}

export function logoutSubmit() {
  return {type: LOGOUT}
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then (res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errMsg(res.data.msg))
        }
      })
  }
}

export function login({username, password}) {
  if (!username || !password) {
    return errMsg('Username & Password are required')
  }
  return dispatch=> {
    axios.post('/user/login', {username, password})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
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
        dispatch(authSuccess({username, type}))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }

}