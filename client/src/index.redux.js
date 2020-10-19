const ADD_NUM = 'add'
const REMOVE_NUM = 'subtraction'

// reducer
export function counter(state=0, action) {
  switch(action.type) {
    case 'add':
      return state+1
    case 'subtraction':
      return state-1
    default:
      return 10
  }
}

//action creator
export function addNum() {
  return {type: ADD_NUM}
}
export function removeNum() {
  return {type: REMOVE_NUM}
}

export function addNumAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(addNum())
    }, 2000)
  }
}