import { SAVE_PARAMS, CACHE_DATA, SELECT_DATASET, SAVE_CATEGORIES } from './action_types'
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

export function selectDataset(dataset){
  return function(dispatch){
    dispatch({
      type: SELECT_DATASET,
      payload: dataset
    })
  }
}

export function saveCategoriesToState(categories){
  return function(dispatch){
    dispatch({
      type: SAVE_CATEGORIES,
      payload: categories
    })
  }
}
