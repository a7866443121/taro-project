import { combineReducers } from 'redux'
import * as person from './person'

export default combineReducers({
  ...person
})
