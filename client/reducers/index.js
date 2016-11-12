import { combineReducers } from 'redux'
import authReducer from './authReducer'
import ChatReducer from './ChatReducer'
import RoomReducer from './RoomReducer'
import UserReducer from './UserReducer'

export default combineReducers ({
  authReducer,
  ChatReducer,
  RoomReducer,
  UserReducer
})