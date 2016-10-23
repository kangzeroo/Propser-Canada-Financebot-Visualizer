
import { SAVE_PARAMS, SAVE_CATEGORIES } from '../actions/action_types'

const INITIAL_STATE = {
  params: null,
  userId: null,
  user: null,
  categories: []
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case SAVE_PARAMS:
			return {
				...state,
				params: action.payload,
        userId: action.payload.userId
			}
    case SAVE_CATEGORIES:
      return {
        ...state,
        user: action.payload,
        categories: action.payload.categories
      }
	}
	return state;
}
