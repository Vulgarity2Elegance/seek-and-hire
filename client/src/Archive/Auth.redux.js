import axios from "axios"

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'
const initState = {
  isAuth: false,
  user: 'Ben',
  age: 36
}

// reducer
export function auth(state=initState, action) {
  switch(action.type) {
    case LOGIN:
      return {...state, isAuth: true}
    case LOGOUT:
      return {...state, isAuth: false}
    case USER_DATA:
      return {...state, user: action.payload[0].user, age: action.payload[0].age}
    default:
      return state
  }
}

// action creator
// Asynchronous axios request
export function getUserData() {
  // use disptach to notify that state has been changed 
  return dispatch => {
    axios.get('/data')
      .then(res => {
        if (res.status === 200) {
          dispatch(userData(res.data))
        }
      })
  }
}
export function userData(data) {
  return {type: USER_DATA, payload: data}
}
export function login() {
  return {type: LOGIN}
}
export function logout() {
  return {type: LOGOUT}
}