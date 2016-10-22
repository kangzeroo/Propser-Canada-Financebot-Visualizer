import { combineReducers } from 'redux';
import content_reducer from './content_reducer'
import user_reducer from './user_reducer'

const rootReducer = combineReducers({
  content: content_reducer,
  user: user_reducer
});

export default rootReducer;
