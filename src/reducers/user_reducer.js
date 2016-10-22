
import { SAVE_PARAMS } from '../actions/action_types'

const INITIAL_STATE = {
  params: null,
  userId: null,
  category: null,
  subcategory: null,
  startdate: null,
  enddate: null
}

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case SAVE_PARAMS:
			return {
				...state,
				params: action.payload,
        userId: action.payload.userId,
        category: action.payload.category,
        subcategory: action.payload.subcategory,
        startdate: action.payload.startdate,
        enddate: action.payload.enddate
			}
	}
	return state;
}
