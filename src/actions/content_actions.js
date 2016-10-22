import { SAVE_PARAMS, CACHE_DATA, SELECT_DATASET } from './action_types'
import axios from 'axios'

export function cacheDataToState(data){
  return function(dispatch){
    dispatch({
      type: CACHE_DATA,
      payload: data
    })
  }
}

export function saveParamsToState(params){
  return function(dispatch){
    dispatch({
      type: SAVE_PARAMS,
      payload: params
    })
  }
}
