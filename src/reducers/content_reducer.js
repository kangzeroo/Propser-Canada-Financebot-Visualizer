import { CACHE_DATA, SELECT_DATASET } from '../actions/action_types'

const INITIAL_STATE = {
  cachedData: [],
	selectedData: []
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case CACHE_DATA:
			return {
				...state,
				cachedData: action.payload
			}
    case SELECT_DATASET:
      return {
        ...state,
        selectedData: action.payload
      }
	}
	return state;
}
