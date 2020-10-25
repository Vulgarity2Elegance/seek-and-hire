// combine all reducers
import {combineReducers} from "redux"
import {user} from "./redux/user.redux"
import {chat} from "./redux/chat.redux"
import {message} from "./redux/message.redux"

export default combineReducers({user, chat, message})