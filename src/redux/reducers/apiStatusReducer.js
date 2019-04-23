import * as types from "../actions/actionTypes";
import initialState from './initialState';

function actionTypesEndInSuccess(type){
  return type.substring(type.length -8) === "_SUCCESS"
}

export default function ApiCallStatusReducer(state= initialState.apiCallsInProgress, action){
  if(action.type == types.BEGIN_API_CALL){
    return state +1;
  }else if(action.type === types.API_CALL_ERROR ||  actionTypesEndInSuccess(action.type)){
    return state -1;
  }
  return state;
}